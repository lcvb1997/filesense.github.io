import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  ArrowLeft, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3,
  PieChart,
  TrendingDown,
  CheckCircle,
  Target,
  Lightbulb,
  Clock,
  DollarSign,
  Shield,
  FileText
} from 'lucide-react'

interface InsightsScreenProps {
  onNavigate: (screen: string) => void
}

interface Trend {
  id: string
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  change: number
  period: string
}

interface Pattern {
  id: string
  title: string
  description: string
  frequency: number
  documents: string[]
  severity: 'high' | 'medium' | 'low'
}

interface Recommendation {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  estimatedImpact: string
  timeToImplement: string
}

export function InsightsScreen({ onNavigate }: InsightsScreenProps) {
  const trends: Trend[] = [
    {
      id: '1',
      title: 'Aumento de Cláusulas de Penalidade',
      description: 'Contratos com penalidades acima de 10% aumentaram 35% no último trimestre',
      impact: 'negative',
      change: 35,
      period: 'Último trimestre'
    },
    {
      id: '2',
      title: 'Melhoria na Documentação Financeira',
      description: 'Redução de inconsistências em relatórios financeiros',
      impact: 'positive',
      change: -28,
      period: 'Últimos 60 dias'
    },
    {
      id: '3',
      title: 'Prazo de Pagamento Estendido',
      description: 'Média de prazo de pagamento aumentou de 45 para 52 dias',
      impact: 'negative',
      change: 15.6,
      period: 'Último semestre'
    }
  ]

  const patterns: Pattern[] = [
    {
      id: '1',
      title: 'Valores Conflitantes em Contratos',
      description: 'Identificado padrão de divergência entre tabelas de preços e texto dos contratos',
      frequency: 78,
      documents: ['Contrato ABC', 'Contrato XYZ', 'Proposta DEF'],
      severity: 'high'
    },
    {
      id: '2',
      title: 'Ausência de Force Majeure',
      description: 'Maior parte dos contratos não possui cláusulas de proteção para eventos extraordinários',
      frequency: 65,
      documents: ['Contrato Fornecedor A', 'Acordo Comercial B'],
      severity: 'medium'
    },
    {
      id: '3',
      title: 'Documentos Sem Assinatura Digital',
      description: 'Padrão de documentos importantes sem validação digital adequada',
      frequency: 45,
      documents: ['Política Interna', 'Relatório Q1'],
      severity: 'low'
    }
  ]

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Implementar Revisão Automática de Valores',
      description: 'Criar sistema de validação cruzada para identificar divergências de valores automaticamente',
      priority: 'high',
      estimatedImpact: 'Redução de 80% em inconsistências',
      timeToImplement: '2-3 semanas'
    },
    {
      id: '2',
      title: 'Padronizar Cláusulas de Force Majeure',
      description: 'Desenvolver template padrão com cláusulas de proteção para todos os contratos',
      priority: 'medium',
      estimatedImpact: 'Redução de risco legal em 60%',
      timeToImplement: '1-2 semanas'
    },
    {
      id: '3',
      title: 'Estabelecer Limites para Penalidades',
      description: 'Criar política interna limitando penalidades contratuais a um máximo de 8%',
      priority: 'high',
      estimatedImpact: 'Economia estimada de R$ 200k/ano',
      timeToImplement: '1 semana'
    },
    {
      id: '4',
      title: 'Implementar Assinatura Digital Obrigatória',
      description: 'Tornar obrigatório o uso de assinatura digital em todos os documentos críticos',
      priority: 'medium',
      estimatedImpact: 'Melhoria em 90% na validação',
      timeToImplement: '3-4 semanas'
    }
  ]

  const criticalAlerts = [
    {
      id: '1',
      message: 'Padrão de penalidades excessivas detectado em 5 contratos recentes',
      severity: 'critical',
      action: 'Revisar imediatamente'
    },
    {
      id: '2',
      message: 'Aumento de 40% em inconsistências financeiras no último mês',
      severity: 'high',
      action: 'Investigar causas'
    }
  ]

  const getTrendIcon = (impact: string, change: number) => {
    if (impact === 'positive' || change < 0) {
      return <TrendingDown className="h-4 w-4 text-green-500" />
    }
    return <TrendingUp className="h-4 w-4 text-red-500" />
  }

  const getTrendColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getPatternColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
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
              <h1>Insights e Análises</h1>
              <p className="text-muted-foreground">
                Padrões, tendências e recomendações baseadas nos seus documentos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Cards de Resumo */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos Analisados</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  +12 esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Padrões Identificados</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patterns.length}</div>
                <p className="text-xs text-muted-foreground">
                  2 críticos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recomendações Ativas</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recommendations.length}</div>
                <p className="text-xs text-muted-foreground">
                  2 alta prioridade
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 380k</div>
                <p className="text-xs text-muted-foreground">
                  Por ano estimado
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tendências e Padrões */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tendências */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tendências Identificadas
                  </CardTitle>
                  <CardDescription>
                    Mudanças nos padrões dos seus documentos ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trends.map((trend) => (
                      <div key={trend.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getTrendIcon(trend.impact, trend.change)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{trend.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`font-medium ${getTrendColor(trend.impact)}`}>
                              {trend.change > 0 ? '+' : ''}{trend.change}%
                            </span>
                            <span className="text-muted-foreground">{trend.period}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Padrões Recorrentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Padrões Recorrentes
                  </CardTitle>
                  <CardDescription>
                    Problemas ou características que aparecem frequentemente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patterns.map((pattern) => (
                      <div key={pattern.id} className={`p-4 border rounded-lg ${getPatternColor(pattern.severity)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{pattern.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                          </div>
                          <Badge variant={pattern.severity === 'high' ? 'destructive' : 
                                        pattern.severity === 'medium' ? 'secondary' : 'outline'}>
                            {pattern.severity === 'high' ? 'Alta' :
                             pattern.severity === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Frequência nos documentos</span>
                            <span>{pattern.frequency}%</span>
                          </div>
                          <Progress value={pattern.frequency} />
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Exemplos: </span>
                          {pattern.documents.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alertas e Recomendações */}
            <div className="space-y-6">
              {/* Alertas Críticos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas Críticos
                  </CardTitle>
                  <CardDescription>
                    Situações que requerem atenção imediata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                        <div className="mb-2">
                          <Badge variant="destructive" className="text-xs mb-2">
                            {alert.severity === 'critical' ? 'Crítico' : 'Alto'}
                          </Badge>
                          <p className="text-sm font-medium text-red-800 mb-1">
                            {alert.message}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          {alert.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recomendações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recomendações de Ação
                  </CardTitle>
                  <CardDescription>
                    Sugestões para melhorar seus processos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{rec.title}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority === 'high' ? 'Alta' :
                             rec.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Impacto:</span>
                            <span className="text-green-600">{rec.estimatedImpact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tempo:</span>
                            <span>{rec.timeToImplement}</span>
                          </div>
                        </div>
                        
                        <Button size="sm" className="w-full mt-3" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Implementar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resumo Executivo */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Executivo</CardTitle>
              <CardDescription>
                Principais descobertas e ações recomendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Principais Descobertas:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 78% dos contratos possuem inconsistências de valores</li>
                    <li>• Penalidades contratuais aumentaram 35% no último trimestre</li>
                    <li>• 65% dos documentos não possuem proteção adequada contra force majeure</li>
                    <li>• Melhoria de 28% na qualidade da documentação financeira</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Próximos Passos:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Implementar validação automática de valores (2-3 semanas)</li>
                    <li>• Criar templates padrão com cláusulas de proteção</li>
                    <li>• Estabelecer limites para penalidades contratuais</li>
                    <li>• Revisar contratos com alertas críticos imediatamente</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button className="mr-3">
                  Gerar Relatório Completo
                </Button>
                <Button variant="outline">
                  Agendar Reunião de Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}