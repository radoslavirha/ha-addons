import { Controller, ProviderScope, Scope } from '@tsed/di';
import { Default, Description, Get, Returns } from '@tsed/schema';
import { RadarCitiesHandler, RadarImageHandler } from '../handlers/radar/index.js';
import { RadarCitiesResponse } from '../models/index.js';
import { QueryParams } from '@tsed/platform-params';

@Description('API endpoints related to rain forecast.')
@Controller('/radar')
@Scope(ProviderScope.REQUEST)
export class RadarController {
    constructor(
        private radarCitiesHandler: RadarCitiesHandler,
        private radarImageHandler: RadarImageHandler
    ) {}

    @Get('/cities')
    @Description('Returns cities array with corresponding RGBA color for LEDs from radar.')
    @Returns(200, RadarCitiesResponse)
    async getRadarCities(
        @Description('Radius in kilometers around each city to calculate current conditions.')
        @QueryParams('radius')
        @Default(2.5)
        radius?: number
    ): Promise<RadarCitiesResponse> {
        return this.radarCitiesHandler.execute(radius);
    }

    @Get('/image')
    @Description('Returns current radar image with cities.')
    @(Returns(200, String).ContentType('image/png'))
    async getRadarImage(): Promise<Buffer> {
        return this.radarImageHandler.execute();
    }
}
