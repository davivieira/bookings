import { SCMessagePageContainer, SCMessage } from "@/styles"

function MessagePage({ children }: { children: React.ReactNode }) {
  return (
    <SCMessagePageContainer>
      <SCMessage variant="h4">
        {children}
      </SCMessage>
    </SCMessagePageContainer>
  )
}

export default MessagePage