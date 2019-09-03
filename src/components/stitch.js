import {
    Stitch,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";

 const AppId="APP_ID" //
 const StitchName="STITCH_APP_NAME" //
  export const client = Stitch.initializeDefaultAppClient(AppId);
  const mongodb = client.getServiceClient(
    RemoteMongoClient.factory,
    StitchName
  );

  export const db = mongodb.db("TheChargeProject");

