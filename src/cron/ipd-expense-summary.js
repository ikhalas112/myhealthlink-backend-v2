const Parse = require('parse/node');

const IPD_BED = 'Ipd_Bed';
const IPD_BED_CONSUMABLE = 'Ipd_BedConsumable';
const CONSUMABLE_LIST = 'Consumable_List';

const ipdExpenseSummary = async () => {
  const ipdObjectIds = await getIpdObjectIds();

  const ipdConsumables = await Promise.all(
    ipdObjectIds.map(async ipdObjectId => {
      const consumable = await getIpdConsumableById(ipdObjectId);
      return consumable;
    })
  );

  console.log(JSON.stringify(ipdConsumables, null, 4));
};

const getIpdObjectIds = async () => {
  const Object = Parse.Object.extend(IPD_BED);
  const query = new Parse.Query(Object);
  query.equalTo('isActive', true);
  const results = await query.find();
  if (!results) return [];
  const objectIds = results.map(result => {
    const json = result.toJSON();
    return json.objectId;
  });
  return objectIds;
};

const getIpdConsumableById = async bedObjectId => {
  const Object = Parse.Object.extend(IPD_BED_CONSUMABLE);
  const query = new Parse.Query(Object);
  query.equalTo('hostBed', bedPointer(bedObjectId));
  const results = await query.find();
  if (!results) return [];
  const jsons = await Promise.all(
    results.map(async result => {
      const json = result.toJSON();
      const hostConsumable = await getConsumableById(json.hostConsumable.objectId);
      return { ...json, hostConsumable };
    })
  );
  return jsons;
};

const getConsumableById = async consumableObjectId => {
  const Object = Parse.Object.extend(CONSUMABLE_LIST);
  const query = new Parse.Query(Object);
  query.equalTo('objectId', consumableObjectId);
  const object = await query.first();
  const json = object.toJSON();
  return json;
};

const bedPointer = objectId => ({
  __type: 'Pointer',
  className: IPD_BED,
  objectId,
});

module.exports = ipdExpenseSummary;
