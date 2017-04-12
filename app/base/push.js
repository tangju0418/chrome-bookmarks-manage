import { requestPlus, requestNative, requestStorage } from 'runtime'
import requireOwner from 'app/base/plugins/owner'
import Setting from 'setting'

//绑定推送标签
export function bindTags(tags) {
  var storageVal;
  var key = 'PUSH.TAGS'
  return requestStorage().then(function(storage){
    storageVal = storage;
    return requireOwner();
  })
  .then(function(owner){
    owner.setBadge(0)
    var tagsVal = storageVal.getItem(key);
    if(tagsVal == tags) {
      console.log('bindTags', 'unchanged', tagsVal)
      return Promise.resolve(0);
    } else
      return owner.bindTags(tags);
  })
  .then(function(result){
    if(result!=0) {
      storageVal.setItem(key, tags)
      console.info('bindTags success.')
    }
  })

}

//绑定推送标签
export function bindAlias(alias) {
  var storageVal;
  var key = 'PUSH.ALIAS'
  return requestStorage().then(function(storage){
    storageVal = storage;
    return requireOwner();
  })
  .then(function(owner){
    var aliasVal = storageVal.getItem(key);
    if(aliasVal == alias) {
      console.log('bindAlias', 'unchanged.', alias)
      //return Promise.resolve(0);
      return owner.bindAlias(alias);
    } else
      return owner.bindAlias(alias);
  })
  .then(function(result){
    if(result!=0) {
      storageVal.setItem(key, alias)
      console.info('bindAlias success.')
    }
  })
}
