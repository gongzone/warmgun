import * as React from "react"

type ListElement = React.ElementRef<"ul"> | React.ElementRef<"ol">
type ListUlProps = { as?: "ul" } & React.ComponentPropsWithoutRef<"ul">
type ListOlProps = { as?: "ol" } & React.ComponentPropsWithoutRef<"ol">
type ListProps = ListUlProps | ListOlProps

const List = React.forwardRef<ListElement, ListProps>(
  ({ className, ...props }, forwardedRef) => {
    return <ul className={className} ref={forwardedRef} {...props} />
  }
)
List.displayName = "List"

type ListItemElement = React.ElementRef<"li">
interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {}

const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  ({ className, ...props }, forwardedRef) => {
    return <li className={className} ref={forwardedRef} {...props} />
  }
)
ListItem.displayName = "ListItem"

const ListNamespace = Object.assign(List, { Item: ListItem })

export { ListNamespace as List }
