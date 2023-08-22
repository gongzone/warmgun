import { Avatar } from "@/components/@ui/avatar"
import { Badge } from "@/components/@ui/badge"
import { Button } from "@/components/@ui/button"
import { Card, CardBody } from "@/components/@ui/card"

export default function Home() {
  return (
    <main className="space-y-12 p-20">
      <div className="flex flex-wrap items-center gap-4">
        <Button>로그인</Button>
        <Button variant="base">로그인</Button>
        <Button variant="base-invert">로그인</Button>
        <Button variant="base-ghost">로그인</Button>
        <Button variant="primary">로그인</Button>
        <Button variant="primary-invert">로그인</Button>
        <Button variant="primary-ghost">로그인</Button>
        <Button variant="success">로그인</Button>
        <Button variant="success-invert">로그인</Button>
        <Button variant="success-ghost">로그인</Button>
        <Button variant="warning">로그인</Button>
        <Button variant="warning-invert">로그인</Button>
        <Button variant="warning-ghost">로그인</Button>
        <Button variant="danger">로그인</Button>
        <Button variant="danger-invert">로그인</Button>

        <Card>
          <CardBody>
            <Button variant="danger-ghost" fullWidth>
              로그인
            </Button>
            <Button size="sm">로그인</Button>
            <Button size="md">로그인</Button>
            <Button size="lg">로그인</Button>
            <Button onlyIcon={true}>
              <svg
                aria-hidden="true"
                fill="none"
                className="h-6 w-6"
                role="presentation"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Button>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
        />
        <Avatar src={null} alt="test" />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
          size="xs"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
          size="sm"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
          size="md"
          border
          radius="xl"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
          size="lg"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="test"
          size="xl"
          border
        />
        <Badge variant="primary-invert">asdsa</Badge>
      </div>
    </main>
  )
}
