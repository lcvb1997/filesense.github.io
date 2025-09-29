import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Shield,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  Download,
  Share2
} from 'lucide-react'

interface DocumentScreenProps {
  onNavigate: (screen: string) => void
  documentId?: string
}

interface Risk {
  id: string
  type: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  section: string
}

interface Opportunity {
  id: string
  title: string
  description: string
  impact: string
}

interface Inconsistency {
  id: string
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
}

export function DocumentScreen({ onNavigate, documentId }: DocumentScreenProps) {
  // Mock data baseado no documentId
  const document = {
    id: documentId || '1',
    name: 'Contrato Fornecedor ABC - Renovação 2024',
    type: 'Contrato Comercial',
    size: '2.4 MB',
    pages: 24,
    uploadDate: '2024-01-15',
    status: 'Análise Completa',
    tags: ['Risco', 'Financeiro', 'Urgente'],
    riskLevel: 'critical'
  }

  const summary = `Este contrato de renovação com o Fornecedor ABC apresenta termos comerciais para o período 2024-2025. 
  O documento inclui cláusulas de preço, prazo de entrega, penalidades e condições de pagamento. 
  Identificamos algumas questões críticas relacionadas às penalidades por atraso e termos de rescisão que requerem atenção imediata.`

  const risks: Risk[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Cláusula de Penalidade Excessiva',
      description: 'Penalidade de 15% sobre o valor total do contrato em caso de atraso superior a 30 dias.',
      section: 'Seção 4.2 - Penalidades'
    },
    {
      id: '2',
      type: 'high',
      title: 'Ausência de Cláusula de Force Majeure',
      description: 'O contrato não prevê proteções em casos de força maior ou eventos extraordinários.',
      section: 'Documento geral'
    },
    {
      id: '3',
      type: 'medium',
      title: 'Prazo de Pagamento Estendido',
      description: 'Prazo de pagamento de 60 dias pode impactar o fluxo de caixa.',
      section: 'Seção 3.1 - Condições de Pagamento'
    }
  ]

  const opportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Negociação de Desconto por Volume',
      description: 'Possibilidade de obter 5% de desconto adicional para pedidos acima de R$ 500.000.',
      impact: 'Economia estimada de R$ 75.000/ano'
    },
    {
      id: '2',
      title: 'Redução do Prazo de Entrega',
      description: 'Fornecedor pode reduzir prazo de 45 para 30 dias mediante ajuste de preço mínimo.',
      impact: 'Melhoria no ciclo de produção'
    }
  ]

  const inconsistencies: Inconsistency[] = [
    {
      id: '1',
      title: 'Divergência de Valores',
      description: 'Valor unitário na tabela (R$ 125,00) difere do mencionado no corpo do texto (R$ 128,00).',
      severity: 'high'
    },
    {
      id: '2',
      title: 'Data de Vigência Conflitante',
      description: 'Data de início mencionada como 01/02/2024 no cabeçalho e 15/02/2024 na cláusula 1.1.',
      severity: 'medium'
    }
  ]

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      default: return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getRiskColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50'
      case 'high': return 'border-orange-200 bg-orange-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-green-200 bg-green-50'
    }
  }

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'Risco': return <Shield className="h-3 w-3" />
      case 'Financeiro': return <DollarSign className="h-3 w-3" />
      case 'Urgente': return <Zap className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-lg">{document.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{document.type}</span>
                  <span>•</span>
                  <span>{document.size}</span>
                  <span>•</span>
                  <span>{document.pages} páginas</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumo Automático */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resumo Automático
                </CardTitle>
                <CardDescription>
                  Análise gerada automaticamente do conteúdo do documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{summary}</p>
              </CardContent>
            </Card>

            {/* Riscos Identificados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Riscos Identificados
                </CardTitle>
                <CardDescription>
                  Pontos de atenção que podem gerar problemas futuros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {risks.map((risk) => (
                    <div key={risk.id} className={`p-4 border rounded-lg ${getRiskColor(risk.type)}`}>
                      <div className="flex items-start gap-3">
                        {getRiskIcon(risk.type)}
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{risk.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {risk.section}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inconsistências */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-orange-500" />
                  Inconsistências Encontradas
                </CardTitle>
                <CardDescription>
                  Conflitos ou divergências no documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inconsistencies.map((inconsistency) => (
                    <div key={inconsistency.id} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{inconsistency.title}</h4>
                          <p className="text-sm text-muted-foreground">{inconsistency.description}</p>
                        </div>
                        <Badge variant={inconsistency.severity === 'high' ? 'destructive' : 'secondary'}>
                          {inconsistency.severity === 'high' ? 'Alta' : 'Média'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Oportunidades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Oportunidades Identificadas
                </CardTitle>
                <CardDescription>
                  Pontos que podem ser aproveitados para melhorias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                          <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                            {opportunity.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Documento */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Documento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Status da Análise</p>
                  <Badge variant="default">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {document.status}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-1">Data de Upload</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(document.uploadDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Nível de Risco Geral</p>
                  <Badge variant="destructive">Crítico</Badge>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Tags Aplicadas</p>
                  <div className="flex flex-wrap gap-1">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {getTagIcon(tag)}
                        <span className="ml-1">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo da Análise */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Análise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Riscos Identificados</span>
                  <Badge variant="destructive">{risks.length}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Inconsistências</span>
                  <Badge variant="secondary">{inconsistencies.length}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Oportunidades</span>
                  <Badge variant="outline">{opportunities.length}</Badge>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Confiabilidade da Análise</p>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <p className="text-xs text-muted-foreground">
                    Baseado na qualidade do documento e clareza do texto
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ações Recomendadas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Recomendadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="default" className="w-full justify-start text-sm">
                  Revisar cláusulas de penalidade
                </Button>
                <Button variant="default" className="w-full justify-start text-sm">
                  Validar valores conflitantes
                </Button>
                <Button variant="default" className="w-full justify-start text-sm">
                  Negociar termos de pagamento
                </Button>
                <Button variant="default" className="w-full justify-start text-sm">
                  Incluir cláusula de force majeure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}