import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { FileText, CheckCircle, Clock, Zap, BarChart3 } from 'lucide-react'

interface ProcessingScreenProps {
  onNavigate: (screen: string) => void
}

interface ProcessingStep {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed'
  progress: number
}

interface ProcessingDocument {
  id: string
  name: string
  status: 'queued' | 'processing' | 'completed'
  progress: number
}

export function ProcessingScreen({ onNavigate }: ProcessingScreenProps) {
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [processedCount, setProcessedCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const [steps] = useState<ProcessingStep[]>([
    { id: '1', name: 'Leitura de Documentos', status: 'pending', progress: 0 },
    { id: '2', name: 'Extração de Texto', status: 'pending', progress: 0 },
    { id: '3', name: 'Análise de Conteúdo', status: 'pending', progress: 0 },
    { id: '4', name: 'Classificação e Tags', status: 'pending', progress: 0 },
    { id: '5', name: 'Detecção de Riscos', status: 'pending', progress: 0 }
  ])

  const [documents] = useState<ProcessingDocument[]>([
    { id: '1', name: 'Contrato_Fornecedor_ABC.pdf', status: 'queued', progress: 0 },
    { id: '2', name: 'Relatório_Financeiro_Q1.xlsx', status: 'queued', progress: 0 },
    { id: '3', name: 'Proposta_Comercial_2024.docx', status: 'queued', progress: 0 }
  ])

  // Simular progresso de processamento
  useEffect(() => {
    const timer = setInterval(() => {
      setOverallProgress(prev => {
        if (prev >= 100) {
          setIsCompleted(true)
          return 100
        }
        return prev + 2
      })

      setProcessedCount(prev => {
        const newCount = Math.floor(overallProgress / 33.33)
        return Math.min(newCount, 3)
      })
    }, 200)

    return () => clearInterval(timer)
  }, [overallProgress])

  const getStepStatus = (stepIndex: number) => {
    const stepProgress = (overallProgress - (stepIndex * 20)) / 20 * 100
    
    if (stepProgress <= 0) return 'pending'
    if (stepProgress >= 100) return 'completed'
    return 'processing'
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Zap className="h-5 w-5 text-blue-500" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getDocumentStatus = (docIndex: number) => {
    const docProgress = (overallProgress - (docIndex * 33.33)) / 33.33 * 100
    
    if (docProgress <= 0) return 'queued'
    if (docProgress >= 100) return 'completed'
    return 'processing'
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1>Processamento de Documentos</h1>
          <p className="text-muted-foreground">
            Aguarde enquanto analisamos seus documentos
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Status Geral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso Geral</CardTitle>
                <CardDescription>
                  {isCompleted ? 'Processamento concluído!' : 'Processando documentos...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Progresso Total</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl">{processedCount}</p>
                      <p className="text-sm text-muted-foreground">Processados</p>
                    </div>
                    <div>
                      <p className="text-2xl">3</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <p className="text-2xl">{3 - processedCount}</p>
                      <p className="text-sm text-muted-foreground">Restantes</p>
                    </div>
                  </div>

                  {isCompleted && (
                    <Button 
                      onClick={() => onNavigate('dashboard')} 
                      className="w-full mt-4"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Dashboard
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Etapas de Processamento */}
            <Card>
              <CardHeader>
                <CardTitle>Etapas de Processamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const status = getStepStatus(index)
                    const stepProgress = Math.max(0, Math.min(100, (overallProgress - (index * 20)) / 20 * 100))
                    
                    return (
                      <div key={step.id} className="flex items-center gap-3">
                        {getStepIcon(status)}
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className={status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                              {step.name}
                            </span>
                            <Badge variant={
                              status === 'completed' ? 'default' :
                              status === 'processing' ? 'secondary' :
                              'outline'
                            }>
                              {status === 'completed' ? 'Concluído' :
                               status === 'processing' ? 'Processando' :
                               'Aguardando'}
                            </Badge>
                          </div>
                          {status === 'processing' && (
                            <Progress value={stepProgress} className="mt-1" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documentos Individuais */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Status dos Documentos</CardTitle>
                <CardDescription>
                  Acompanhe o progresso individual de cada arquivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => {
                    const status = getDocumentStatus(index)
                    const docProgress = Math.max(0, Math.min(100, (overallProgress - (index * 33.33)) / 33.33 * 100))
                    
                    return (
                      <div key={doc.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="truncate">{doc.name}</p>
                            <Badge variant={
                              status === 'completed' ? 'default' :
                              status === 'processing' ? 'secondary' :
                              'outline'
                            } className="mt-1">
                              {status === 'completed' ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Processado
                                </>
                              ) : status === 'processing' ? (
                                <>
                                  <Zap className="h-3 w-3 mr-1" />
                                  Processando
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Na fila
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                        
                        {status === 'processing' && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Progresso</span>
                              <span className="text-sm">{Math.round(docProgress)}%</span>
                            </div>
                            <Progress value={docProgress} />
                          </div>
                        )}
                        
                        {status === 'completed' && (
                          <div className="text-sm text-green-600 mt-2">
                            ✓ Análise completa - 4 tags identificadas
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}