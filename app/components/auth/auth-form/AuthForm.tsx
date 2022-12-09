import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

import LoginForm from './login-form/LoginForm'
import SignupForm from './signup-form/SignupForm'

export default function AuthForm() {
  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>로그인</Tab>
          <Tab>회원가입</Tab>
        </TabList>

        <TabPanels py="16px">
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
