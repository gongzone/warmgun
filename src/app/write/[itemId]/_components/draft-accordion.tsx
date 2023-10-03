import { fetchDrafts } from "@/lib/services/draft/fetch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/@ui/accordion"
import { Icons } from "@/components/@ui/icons"
import { Text } from "@/components/@ui/text"

import { DraftListItem } from "./draft-list-item"

type DraftAccoridonProps = {
  userId: string
}

export const DraftAccordion = async ({ userId }: DraftAccoridonProps) => {
  const drafts = await fetchDrafts(userId)

  return (
    <Accordion type="single" collapsible defaultValue="base" className="w-full">
      <AccordionItem value="base">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Icons.DocumentList className="h-4 w-4" />
            <Text>나의 초고</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col">
            {drafts.map((draft) => (
              <li key={draft.id}>
                <DraftListItem draft={draft} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
