import { FondoCliente } from "./fondo"

export interface Cliente {
    id: {},
    identification: number,
    name: string,
    balance: number
    fondos: FondoCliente
}