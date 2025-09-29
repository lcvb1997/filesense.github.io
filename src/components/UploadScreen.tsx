import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Upload, FileText, Folder, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface UploadScreenProps {
  onNavigate: (screen: string) => void
}

interface Document {
  id: string
  name: string
  size: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
}

export function UploadScreen({ onNavigate }: UploadScreenProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Contrato_Fornecedor_ABC.pdf', size: '2.4 MB', status: 'completed', progress: 100 },
    { id: '2', name: 'Relatório_Financeiro_Q1.xlsx', size: '1.8 MB', status: 'uploading', progress: 67 },
    { id: '3', name: 'Proposta_Comercial_2024.docx', size: '890 KB', status: 'error', progress: 0 },
  ])

  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Simular upload de novos arquivos
    const newDoc: Document = {
      id: Date.now().toString(),
      name: 'Novo_Documento.pdf',
      size: '1.2 MB',
      status: 'uploading',
      progress: 0
    }
    setDocuments(prev => [newDoc, ...prev])
  }

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'uploading':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'uploading':
        return 'Enviando'
      case 'error':
        return 'Erro'
    }
  }

  const hasCompletedDocuments = documents.some(doc => doc.status === 'completed')

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1>Upload de Documentos</h1>
          <p className="text-muted-foreground">
            Faça upload dos seus documentos para análise e processamento
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Área de Upload */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Documentos</CardTitle>
                <CardDescription>
                  Arraste arquivos aqui ou clique para selecionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-2">Arraste documentos aqui</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF, DOC, DOCX, XLS, XLSX até 10MB
                  </p>
                  <Button>Selecionar Arquivos</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conectar Fontes</CardTitle>
                <CardDescription>
                  Importe documentos de outras fontes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Folder className="h-4 w-4 mr-2" />
                  Conectar Google Drive
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Conectar Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Folder className="h-4 w-4 mr-2" />
                  Conectar OneDrive
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Documentos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Documentos Carregados</CardTitle>
                <CardDescription>
                  {documents.length} arquivo(s) no total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">{doc.size}</span>
                            <Badge variant={
                              doc.status === 'completed' ? 'default' :
                              doc.status === 'uploading' ? 'secondary' :
                              'destructive'
                            }>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1">{getStatusText(doc.status)}</span>
                            </Badge>
                          </div>
                          {doc.status === 'uploading' && (
                            <Progress value={doc.progress} className="mt-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasCompletedDocuments && (
                  <div className="mt-6 pt-4 border-t">
                    <Button 
                      onClick={() => onNavigate('processing')} 
                      className="w-full"
                    >
                      Processar Documentos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}