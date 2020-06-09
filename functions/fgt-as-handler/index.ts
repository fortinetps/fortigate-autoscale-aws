import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, ScheduledEvent } from 'aws-lambda';
import {
    AwsPlatformAdapter,
    AwsFortiGateAutoscale,
    AwsPlatformAdaptee,
    AwsFortiGateAutoscaleTgw
} from 'autoscale-core';
import { AutoscaleEnvironment } from 'autoscale-core/dist/autoscale-environment';
import {
    AwsApiGatewayEventProxy,
    AwsScheduledEventProxy
} from 'autoscale-core/dist/fortigate-autoscale/aws/aws-cloud-function-proxy';
// API Gateway event handler for http requests coming from FortiGate callback
export const autoscaleHandler = (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const env = {} as AutoscaleEnvironment;
    const proxy = new AwsApiGatewayEventProxy(event, context);
    const platform = new AwsPlatformAdapter(new AwsPlatformAdaptee(), proxy);
    const autoscale = new AwsFortiGateAutoscale<
        APIGatewayProxyEvent,
        Context,
        APIGatewayProxyResult
    >(platform, env, proxy);
    return autoscale.handleAutoscaleRequest(proxy, platform, env);
};

// to handle cloudwatch scheduled event
export const scheduledEventHandler = (event: ScheduledEvent, context: Context): Promise<void> => {
    const env = {} as AutoscaleEnvironment;
    const proxy = new AwsScheduledEventProxy(event, context);
    const platform = new AwsPlatformAdapter(new AwsPlatformAdaptee(), proxy);
    const autoscale = new AwsFortiGateAutoscale<ScheduledEvent, Context, void>(
        platform,
        env,
        proxy
    );
    autoscale.handleAutoscaleRequest(proxy, platform, env);
    return Promise.resolve();
};

// Transit Gateway Integration
// API Gateway event handler for http requests coming from FortiGate callback
export const autoscaleTgwHandler = (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const env = {} as AutoscaleEnvironment;
    const proxy = new AwsApiGatewayEventProxy(event, context);
    const platform = new AwsPlatformAdapter(new AwsPlatformAdaptee(), proxy);
    const autoscale = new AwsFortiGateAutoscaleTgw<
        APIGatewayProxyEvent,
        Context,
        APIGatewayProxyResult
    >(platform, env, proxy);
    return autoscale.handleAutoscaleRequest(proxy, platform, env);
};

export const scheduledEventTgwHandler = (
    event: ScheduledEvent,
    context: Context
): Promise<void> => {
    const env = {} as AutoscaleEnvironment;
    const proxy = new AwsScheduledEventProxy(event, context);
    const platform = new AwsPlatformAdapter(new AwsPlatformAdaptee(), proxy);
    const autoscale = new AwsFortiGateAutoscaleTgw<ScheduledEvent, Context, void>(
        platform,
        env,
        proxy
    );
    autoscale.handleAutoscaleRequest(proxy, platform, env);
    return Promise.resolve();
};
