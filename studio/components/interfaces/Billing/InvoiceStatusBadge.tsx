import { FC } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Badge } from 'ui'

interface Props {
  status: string
}

export const invoiceStatusMapping: Record<string, { label: string; badgeColor: string }> = {
  draft: {
    label: 'Upcoming',
    badgeColor: 'yellow',
  },
  paid: {
    label: 'Paid',
    badgeColor: 'green',
  },
  void: {
    label: 'Forgiven',
    badgeColor: 'green',
  },

  // We do not want to overcomplicate it for the user, so we'll treat uncollectible/open the same from a user perspective
  // it's an oustanding invoice
  uncollectible: {
    label: 'Outstanding',
    badgeColor: 'red',
  },
  open: {
    label: 'Outstanding',
    badgeColor: 'red',
  },
}

const InvoiceStatusBadge: FC<Props> = ({ status }) => {
  const statusMapping = invoiceStatusMapping[status]

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger>
        <Badge
          size="small"
          className="capitalize"
          // @ts-ignore
          color={statusMapping?.badgeColor || 'gray'}
        >
          {statusMapping?.label || status}
        </Badge>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">
        <Tooltip.Arrow className="radix-tooltip-arrow" />
        <div
          className={[
            'rounded bg-scale-100 py-1 px-2 leading-none shadow',
            'w-[300px] space-y-2 border border-scale-200',
          ].join(' ')}
        >
          {statusMapping?.label === 'Outstanding' && (
            <p className="text-xs text-scale-1200">
              We were not able to collect the money. Make sure you have a valid payment method and
              enough funds. Make sure to pay outstanding invoices to avoid restrictions. You can
              manually pay the invoice below.
            </p>
          )}

          {statusMapping?.label === 'Upcoming' && (
            <p className="text-xs text-scale-1200">
              The invoice will soon be finalized and charged for.
            </p>
          )}

          {statusMapping?.label === 'Paid' && (
            <p className="text-xs text-scale-1200">
              The invoice has been paid successfully. No action is required on your side.
            </p>
          )}

          {statusMapping?.label === 'Forgiven' && (
            <p className="text-xs text-scale-1200">
              This invoice has been forgiven. No action is required on your side.
            </p>
          )}
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export default InvoiceStatusBadge
