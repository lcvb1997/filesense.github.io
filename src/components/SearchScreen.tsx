import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { 
  Search, 
  Filter, 
  ArrowLeft,
  FileText,
  Calendar,
  Tag,
  SlidersHorizontal,
  X,
  Eye,
  Download,
  DollarSign,
  Shield,
  Clock,
  Zap
} from 'lucide-react'

interface SearchScreenProps {
  onNavigate: (screen: string, docId?: string) => void
}

interface SearchResult {
  id: string
  name: string
  type: string
  tags: string[]
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  date: string
  size: string
  match: number
  snippet: string
}

interface SearchFilter {
  categories: string[]
  tags: string[]
  dateRange: string
  riskLevel: string[]
  fileTypes: string[]
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilter>({
    categories: [],
    tags: [],
    dateRange: 'all',
    riskLevel: [],
    fileTypes: []
  })

  const mockResults: SearchResult[] = [
    {
      id: '1',
      name: 'Contrato Fornecedor ABC - Renovação 2024',
      type: 'Contrato',
      tags: ['Risco', 'Financeiro', 'Urgente'],
      riskLevel: 'critical',
      date: '2024-01-15',
      size: '2.4 MB',
      match: 95,
      snippet: '...cláusula de penalidade de 15% sobre o valor total em caso de atraso superior a 30 dias...'
    },
    {
      id: '2',
      name: 'Relatório Financeiro Q1 2024',
      type: 'Relatório',
      tags: ['Financeiro', 'Pendência'],
      riskLevel: 'high',
      date: '2024-01-14',
      size: '1.8 MB',
      match: 87,
      snippet: '...resultado operacional apresenta divergência de 3.2% em relação ao orçamento previsto...'
    },
    {
      id: '3',
      name: 'Proposta Comercial Cliente XYZ',
      type: 'Proposta',
      tags: ['Financeiro'],
      riskLevel: 'medium',
      date: '2024-01-13',
      size: '890 KB',
      match: 76,
      snippet: '...condições de pagamento especiais com desconto progressivo para volumes maiores...'
    },
    {
      id: '4',
      name: 'Política de Compliance Atualizada',
      type: 'Política',
      tags: ['Risco'],
      riskLevel: 'low',
      date: '2024-01-12',
      size: '1.2 MB',
      match: 65,
      snippet: '...novas diretrizes para gestão de riscos operacionais e conformidade regulatória...'
    }
  ]

  const categories = ['Contrato', 'Relatório', 'Proposta', 'Política', 'Ata', 'Parecer']
  const availableTags = ['Risco', 'Financeiro', 'Urgente', 'Pendência', 'Compliance', 'Legal']
  const riskLevels = ['critical', 'high', 'medium', 'low']
  const fileTypes = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX']

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      default: return 'text-green-600'
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive'
      case 'high': return 'secondary'
      case 'medium': return 'outline'
      default: return 'outline'
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

  const handleFilterChange = (filterType: keyof SearchFilter, value: any, checked?: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      
      if (Array.isArray(newFilters[filterType])) {
        const array = newFilters[filterType] as string[]
        if (checked) {
          newFilters[filterType] = [...array, value] as any
        } else {
          newFilters[filterType] = array.filter(item => item !== value) as any
        }
      } else {
        newFilters[filterType] = value
      }
      
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      tags: [],
      dateRange: 'all',
      riskLevel: [],
      fileTypes: []
    })
  }

  const activeFiltersCount = 
    filters.categories.length + 
    filters.tags.length + 
    filters.riskLevel.length + 
    filters.fileTypes.length + 
    (filters.dateRange !== 'all' ? 1 : 0)

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
            <h1>Busca e Filtragem</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Barra de Busca */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Busque por 'contratos com cláusula de penalidade' ou 'documentos financeiros críticos'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Filtros Laterais */}
            {showFilters && (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Limpar
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Categoria */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Categoria</Label>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={filters.categories.includes(category)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('categories', category, checked)
                              }
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Tags */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Tags</Label>
                      <div className="space-y-2">
                        {availableTags.map(tag => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={filters.tags.includes(tag)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('tags', tag, checked)
                              }
                            />
                            <Label htmlFor={`tag-${tag}`} className="text-sm flex items-center gap-1">
                              {getTagIcon(tag)}
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Período */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Período</Label>
                      <Select 
                        value={filters.dateRange} 
                        onValueChange={(value) => handleFilterChange('dateRange', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os períodos</SelectItem>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="week">Última semana</SelectItem>
                          <SelectItem value="month">Último mês</SelectItem>
                          <SelectItem value="quarter">Último trimestre</SelectItem>
                          <SelectItem value="year">Último ano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Nível de Risco */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Nível de Risco</Label>
                      <div className="space-y-2">
                        {riskLevels.map(level => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={`risk-${level}`}
                              checked={filters.riskLevel.includes(level)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('riskLevel', level, checked)
                              }
                            />
                            <Label htmlFor={`risk-${level}`} className={`text-sm ${getRiskColor(level)}`}>
                              {level === 'critical' ? 'Crítico' :
                               level === 'high' ? 'Alto' :
                               level === 'medium' ? 'Médio' : 'Baixo'}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Tipo de Arquivo */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Tipo de Arquivo</Label>
                      <div className="space-y-2">
                        {fileTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`type-${type}`}
                              checked={filters.fileTypes.includes(type)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('fileTypes', type, checked)
                              }
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Resultados */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Resultados da Busca</CardTitle>
                      <CardDescription>
                        {mockResults.length} documento(s) encontrado(s)
                      </CardDescription>
                    </div>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevância</SelectItem>
                        <SelectItem value="date">Data (mais recente)</SelectItem>
                        <SelectItem value="name">Nome (A-Z)</SelectItem>
                        <SelectItem value="risk">Nível de risco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.map((result) => (
                      <div 
                        key={result.id} 
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => onNavigate('document', result.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-medium truncate">{result.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {result.match}% match
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span>{result.type}</span>
                              <span>•</span>
                              <span>{result.size}</span>
                              <span>•</span>
                              <span>{new Date(result.date).toLocaleDateString('pt-BR')}</span>
                              <span>•</span>
                              <span className={getRiskColor(result.riskLevel)}>
                                Risco: {result.riskLevel === 'critical' ? 'Crítico' :
                                        result.riskLevel === 'high' ? 'Alto' :
                                        result.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                              </span>
                            </div>

                            <div className="flex gap-1 mb-2">
                              {result.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {getTagIcon(tag)}
                                  <span className="ml-1">{tag}</span>
                                </Badge>
                              ))}
                            </div>

                            <p className="text-sm text-muted-foreground italic">
                              {result.snippet}
                            </p>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paginação */}
                  <div className="flex justify-center mt-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button variant="default" size="sm">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">
                        Próximo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}