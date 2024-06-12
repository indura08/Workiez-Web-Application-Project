import { ServiceName } from "./Enums/ServicenameEnum";

export interface Service {
    serviceId: number,
    serviceName: ServiceName,
    description:string,
    priceRange:string,
    workers: Worker[]
}