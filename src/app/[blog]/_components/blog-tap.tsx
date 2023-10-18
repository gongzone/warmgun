import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/@ui/tabs"

export const BlogTab = () => {
  return (
    <Tabs defaultValue="account" className="w-[280px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">아티클</TabsTrigger>
        <TabsTrigger value="password">모음집</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
