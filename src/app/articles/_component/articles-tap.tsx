import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/@ui/tabs"

export const ArticlesTab = () => {
  return (
    <Tabs defaultValue="account" className="w-[280px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="account">최신순</TabsTrigger>
        <TabsTrigger value="password">트렌딩</TabsTrigger>
        <TabsTrigger value="sad">베스트</TabsTrigger>
        <TabsTrigger value="dsfds">픽</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
