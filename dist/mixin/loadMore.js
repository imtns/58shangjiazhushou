"use strict";var _require=require("./../utils/http.js"),get=_require.get,_require2=require("./../utils/index.js"),picSrcDomain=_require2.picSrcDomain,modDataByPageUrl="/business/template/loadone",PIC_FIELD={article:"cover",images:"img",services:"img",order:"pics"};module.exports={loadMore:function(e){var a=this,i=e.target.dataset.index,t=this.data.page_data,r=t[i],s=r.id,c=r.name,d=r.props;if("images"===c)return d.cfg.showMore=!1,d.cfg.maxNum=d.cfg.images.length,void this.setData({page_data:t});var o=e.target.dataset,g=Object.assign({},o,{bizmoduleid:s});g="order"===o.type?Object.assign({},{businessServicePage:o.servicePage,businessServiceSize:o.serviceSize},{bizmoduleid:s}):Object.assign({},o,{bizmoduleid:s}),get(modDataByPageUrl,g,function(e){var r=e[o.type];r.data&&r.data.forEach(function(e){e[PIC_FIELD[c]]=picSrcDomain()+e[PIC_FIELD[c]]}),Object.assign(d,r,{data:d.data.concat(r.data)}),t[i].props=d,a.setData({page_data:t})})}};