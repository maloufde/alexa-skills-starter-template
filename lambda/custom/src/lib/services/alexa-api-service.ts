import { services } from "ask-sdk-model";

export class AlexaAPIService {

    accessToken: string | undefined;
    apiEndpoint: string;
    serviceClientFactory: services.ServiceClientFactory | undefined;
    deviceAddressServiceClient: services.deviceAddress.DeviceAddressServiceClient | undefined;
    deviceId: string | undefined;

    constructor(accessToken: string | undefined,
                apiEndpoint: string,
                device: any,
                serviceClientFactory: services.ServiceClientFactory | undefined) {
        this.accessToken = accessToken;
        this.apiEndpoint = apiEndpoint;
        this.deviceId = device.deviceId;
        this.serviceClientFactory = serviceClientFactory;
    }


    /**
     * Get the country and postal code of the device address
     * @returns {Promise<services.deviceAddress.ShortAddress>}
     * @memberof AlexaAPIService
     */
    callAddressServiceClientApi(): Promise<services.deviceAddress.ShortAddress> {
        return new Promise((resolve, reject) => {
            if (this.deviceId && this.serviceClientFactory) {
                this.deviceAddressServiceClient = this.serviceClientFactory.getDeviceAddressServiceClient();
                this.deviceAddressServiceClient.getCountryAndPostalCode(this.deviceId).then(
                    (getDeviceAddressResponse: services.deviceAddress.ShortAddress) => {
                        resolve(getDeviceAddressResponse);
                    },
                    (getDeviceAddressError) => {
                        // log error here
                        reject(getDeviceAddressError);
                    } 
                )
            }
        })
    }

}