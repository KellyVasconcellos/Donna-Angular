export interface IServico{
  id_funcionario: number
  servicos: Array<IServicos>
}

export interface IServicos{
  id: number
  titulo: string
  descricao: string
  especifica_preco: string
  preco: string
}
