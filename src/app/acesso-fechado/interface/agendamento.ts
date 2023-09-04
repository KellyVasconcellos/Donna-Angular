import { IHorario } from "./horario"

export interface IAgendamento {
  id: number
  id_funcionario: number
  nome_funcionario: string
  id_cliente: number
  nome_cliente: string
  id_servico: number
  nome_servico: string
  horario: IHorario

}
