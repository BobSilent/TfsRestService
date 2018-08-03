import { ITestApi } from "./node_modules/vso-node-api/TestApi";
import { IBuildApi } from "./node_modules/vso-node-api/BuildApi";
import { Build, BuildStatus, Change } from "./node_modules/vso-node-api/interfaces/BuildInterfaces";
import { TestRun } from "./node_modules/vso-node-api/interfaces/TestInterfaces";
import { ITaskAgentApi } from "./node_modules/vso-node-api/TaskAgentApi";
export declare const TeamFoundationCollectionUri: string;
export declare const TeamProject: string;
export declare const RequestedForUsername: string;
export declare const RequestedForUserId: string;
export declare const SourceVersion: string;
export declare const SourceBranch: string;
export declare const CurrentBuildDefinition: string;
export declare const OAuthAccessToken: string;
export declare const RepositoryType: string;
export declare const TfsRepositoryType: string;
export declare const ApiUrl: string;
export declare const AuthenticationMethodOAuthToken: string;
export declare const AuthenticationMethodBasicAuthentication: string;
export declare const AuthenticationMethodPersonalAccessToken: string;
export interface ITfsRestService {
    initialize(authenticationMethod: string, username: string, password: string, tfsServer: string, teamProject: string, ignoreSslError: boolean): Promise<void>;
    getBuildsByStatus(buildDefinitionName: string, statusFilter: BuildStatus): Promise<Build[]>;
    triggerBuild(buildDefinitionName: string, branch: string, requestedFor: string, sourceVersion: string, demands: string[], queueId: number, buildParameters: string): Promise<Build>;
    downloadArtifacts(buildId: number, downloadDirectory: string): Promise<void>;
    getQueueIdByName(buildQueue: string): Promise<number>;
    getBuildInfo(buildId: number): Promise<Build>;
    areBuildsFinished(triggeredBuilds: number[], failIfNotSuccessful: boolean, failIfPartiallySucceeded: boolean): Promise<boolean>;
    isBuildFinished(buildId: number): Promise<boolean>;
    wasBuildSuccessful(buildId: number): Promise<boolean>;
    getBuildDefinitionId(buildDefinitionName: string): Promise<number>;
    getTestRuns(testRunName: string, numberOfRunsToFetch: number): Promise<TestRun[]>;
    getAssociatedChanges(build: Build): Promise<Change[]>;
    cancelBuild(buildId: number): Promise<void>;
}
export declare class TfsRestService implements ITfsRestService {
    vstsBuildApi: IBuildApi;
    vstsTestApi: ITestApi;
    taskAgentApi: ITaskAgentApi;
    teamProjectId: string;
    isDebug: boolean;
    logDebugFunction: (message: string) => void;
    constructor(debug?: boolean, logDebugFunction?: (message: string) => void);
    initialize(authenticationMethod: string, username: string, password: string, tfsServer: string, teamProject: string, ignoreSslError: boolean): Promise<void>;
    getBuildsByStatus(buildDefinitionName: string, statusFilter: BuildStatus): Promise<Build[]>;
    triggerBuild(buildDefinitionName: string, branch: string, requestedForUserID: string, sourceVersion: string, demands: string[], queueId: number, buildParameters: string): Promise<Build>;
    areBuildsFinished(triggeredBuilds: number[], failIfNotSuccessful: boolean, treatPartiallySucceededBuildAsSuccessful: boolean): Promise<boolean>;
    cancelBuild(buildId: number): Promise<void>;
    downloadArtifacts(buildId: number, downloadDirectory: string): Promise<void>;
    getTestRuns(testRunName: string, numberOfRunsToFetch: number): Promise<TestRun[]>;
    getQueueIdByName(buildQueue: string): Promise<number>;
    isBuildFinished(buildId: number): Promise<boolean>;
    wasBuildSuccessful(buildId: number): Promise<boolean>;
    getBuildDefinitionId(buildDefinitionName: string): Promise<number>;
    getAssociatedChanges(build: Build): Promise<Change[]>;
    getBuildInfo(buildId: number): Promise<Build>;
    private buildParameterString(buildParameters);
    private cleanValue(value);
    escapeParametersForRequestBody(value: string): string;
}
