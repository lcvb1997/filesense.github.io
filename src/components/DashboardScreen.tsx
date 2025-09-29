import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Filter,
  Search,
  Eye,
  DollarSign,
  Shield,
  Zap
} from 'lucide-react'

interface DashboardScreenProps {
  onNavigate: (screen: string, docId?: string) => void
}

interface Document {
  id: string
  name: string
  type: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'reviewed' | 'completed'
  tags: string[]
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  dateAdded: string
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const documents: Document[] = [
    {
      id: '1',
      name: 'Contrato Fornecedor ABC - Renovação 2024',
      type: 'Contrato',
      priority: 'high',
      status: 'pending',
      tags: ['Risco', 'Financeiro', 'Urgente'],
      riskLevel: 'critical',
      dateAdded: '2024-01-15'
    },
    {
      id: '2',
      name: 'Relatório Financeiro Q1 2024',
      type: 'Relatório',
      priority: 'high',
      status: 'reviewed',
      tags: ['Financeiro', 'Pendência'],
      riskLevel: 'high',
      dateAdded: '2024-01-14'
    },
    {
      id: '3',
      name: 'Proposta Comercial - Cliente XYZ',
      type: 'Proposta',
      priority: 'medium',
      status: 'completed',
      tags: ['Financeiro'],
      riskLevel: 'medium',
      dateAdded: '2024-01-13'
    },
    {
      id: '4',
      name: 'Política de Compliance Atualizada',
      type: 'Política',
      priority: 'low',
      status: 'reviewed',
      tags: ['Risco'],
      riskLevel: 'low',
      dateAdded: '2024-01-12'
    }
  ]

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'pending').length,
    critical: documents.filter(d => d.riskLevel === 'critical').length,
    processed: documents.filter(d => d.status !== 'pending').length
  }

  const criticalAlerts = [
    {
      id: '1',
      message: 'Contrato com cláusula de penalidade alta detectada',
      document: 'Contrato Fornecedor ABC',
      severity: 'critical'
    },
    {
      id: '2',
      message: 'Inconsistência em valores financeiros encontrada',
      document: 'Relatório Financeiro Q1',
      severity: 'high'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      default: return 'text-green-600'
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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1>Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral dos documentos processados e alertas críticos
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                +2 novos hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Requerem atenção
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
              <p className="text-xs text-muted-foreground">
                Ação imediata
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processados</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.processed}</div>
              <p className="text-xs text-muted-foreground">
                75% do total
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Documentos Prioritários */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Prioritários</CardTitle>
                <CardDescription>
                  Documentos que requerem atenção imediata
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filtros Rápidos */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <Input 
                      placeholder="Buscar documentos..." 
                      className="w-full"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="risco">Risco</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="default" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Lista de Documentos */}
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium truncate">{doc.name}</h4>
                            <Badge className={getPriorityColor(doc.priority)}>
                              {doc.priority === 'high' ? 'Alta' : 
                               doc.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{new Date(doc.dateAdded).toLocaleDateString('pt-BR')}</span>
                            <span>•</span>
                            <span className={getRiskColor(doc.riskLevel)}>
                              Risco: {doc.riskLevel === 'critical' ? 'Crítico' :
                                      doc.riskLevel === 'high' ? 'Alto' :
                                      doc.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                            </span>
                          </div>

                          <div className="flex gap-1 mb-2">
                            {doc.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {getTagIcon(tag)}
                                <span className="ml-1">{tag}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => onNavigate('document', doc.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button 
                    variant="default"
                    onClick={() => onNavigate('search')}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Busca Avançada
                  </Button>
                  
                  <Button 
                    onClick={() => onNavigate('insights')}
                  >
                    Ver Todos os Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas Críticos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Alertas Críticos
                </CardTitle>
                <CardDescription>
                  Itens que requerem ação imediata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-800 mb-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-red-600">
                            {alert.document}
                          </p>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {alert.severity === 'critical' ? 'Crítico' : 'Alto'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="default" className="w-full">
                    Ver Todos os Alertas
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('upload')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Adicionar Documentos
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('search')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Documentos
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('insights')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}