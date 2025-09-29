import { useState } from 'react'
import { LoginScreen } from './components/LoginScreen'
import { UploadScreen } from './components/UploadScreen'
import { ProcessingScreen } from './components/ProcessingScreen'
import { DashboardScreen } from './components/DashboardScreen'
import { DocumentScreen } from './components/DocumentScreen'
import { SearchScreen } from './components/SearchScreen'
import { InsightsScreen } from './components/InsightsScreen'

type Screen = 'login' | 'upload' | 'processing' | 'dashboard' | 'document' | 'search' | 'insights'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>()

  const handleNavigate = (screen: string, docId?: string) => {
    setCurrentScreen(screen as Screen)
    setSelectedDocumentId(docId)
  }

  const handleLogin = () => {
    setCurrentScreen('upload')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />
      case 'upload':
        return <UploadScreen onNavigate={handleNavigate} />
      case 'processing':
        return <ProcessingScreen onNavigate={handleNavigate} />
      case 'dashboard':
        return <DashboardScreen onNavigate={handleNavigate} />
      case 'document':
        return <DocumentScreen onNavigate={handleNavigate} documentId={selectedDocumentId} />
      case 'search':
        return <SearchScreen onNavigate={handleNavigate} />
      case 'insights':
        return <InsightsScreen onNavigate={handleNavigate} />
      default:
        return <LoginScreen onLogin={handleLogin} />
    }
  }

  return (
    <div className="size-full">
      {renderScreen()}
    </div>
  )
}