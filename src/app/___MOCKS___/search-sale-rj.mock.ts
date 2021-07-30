import { HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { MockInterface } from "../mock-interceptor/mock.interface";

const initialData = { 
    "products": {
        "content": [{
            "id": "REB293535",
            "sku": "REM17976",
            "label": "",
            "type": "Apartamento",
            "imageAlternateText": "On The Sea Rio De Janeiro Ipanema REM17976 1",
            "subPrice": "",
            "name": "On The Sea",
            "street": "Rua Francisco Otaviano, 89",
            "neighborhood": "Ipanema, Rio De Janeiro",
            "lat": -22.9871727,
            "lng": -43.1917405,
            "productType": "real_estate_parent",
            "dealType": "sale",
            "divisionUnitType": null,
            "tag": "",
            "descriptionResume": "O On The Sea Arpoador é a novidade que surge como a melhor opção em moradia em uma das áreas mais nobres do Ri..."
        },
        {
            "id": "REB300095",
            "sku": "REM18131",
            "label": "",
            "type": "Apartamento",
            "imageAlternateText": "S Design Rio De Janeiro Botafogo REM18131 2",
            "subPrice": "",
            "name": "S Design",
            "street": "Rua Conde De Irajá, 439",
            "neighborhood": "Botafogo, Rio De Janeiro",
            "pathUrl": "",
            "lat": -22.955997,
            "lng": -43.194958,
            "productType": "real_estate_parent",
            "dealType": "sale",
            "divisionUnitType": null,
            "tag": "",
            "descriptionResume": "Mais que planejado, o S DESIGN foi projetado minuciosamente para que todas as unidades sejam confortáveis, com..."
        }]
    }
};
const mockLocalStorageIndex = "mock:search/sale/br/rj";

// put on shared space
const getDataFromLocalStorageOrMockData = (localStorageIndex: string, dataMock) => {
    let data: any = JSON.parse(localStorage.getItem(localStorageIndex)) || [];
    if (!data.length) {
      data = dataMock;
      localStorage.setItem(localStorageIndex, JSON.stringify(dataMock));
    }
    return data;
  }
export const getSearchSaleRjMock = {
    requestCheck: (url, method) => 
        url.includes('/v2/search/sale//br/rj/rio-de-janeiro') && method === 'GET',
    response: (request: HttpRequest<any>) => (
        of(new HttpResponse({ 
            status: 200, 
            body: getDataFromLocalStorageOrMockData(
                mockLocalStorageIndex, 
                initialData
            )
        }))
    )
} as MockInterface;

export const PatchSearchSaleRjMock = {
    requestCheck: (url, method) => {
      return url.match(/\/REM\/\d+$/) && method === 'PATCH'
    },
    response: (request: HttpRequest<any>) => {
        const dataMock = getDataFromLocalStorageOrMockData(
            mockLocalStorageIndex, 
            initialData
        );

        // get real_estate_sku
        // could be on shared space
        let urlParts = request.url.split('/');
        let sku = parseInt(urlParts[urlParts.length - 1]);
        
        // find real_estate by sku in real_estate array
        const existRealEstateWithSku = dataMock.find(
            real_estate => real_estate.sku == sku
        );

        if (!existRealEstateWithSku) {
            return throwError({ error: { message: 'Not found' } });
        }

        const data = dataMock.map(real_estate => {
            if (real_estate.sku == sku) {
                return {
                    sku: sku,
                    ...request.body
                }
            }
            return real_estate;
        });

        // save new client
        localStorage.setItem(mockLocalStorageIndex, JSON.stringify(data));

        return of(new HttpResponse({ status: 200, body: { message: "Success" } }));
    }
} as MockInterface;