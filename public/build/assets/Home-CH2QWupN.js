import{_ as w,o as _,c as x,a as r,b as D,d as c,e as U,w as i,f as v,g as I,r as n,h as E,F as L,t as d}from"./app-gE3RWlRo.js";function T(s){return{all:s=s||new Map,on:function(t,o){var a=s.get(t);a?a.push(o):s.set(t,[o])},off:function(t,o){var a=s.get(t);a&&(o?a.splice(a.indexOf(o)>>>0,1):s.set(t,[]))},emit:function(t,o){var a=s.get(t);a&&a.slice().map(function(e){e(o)}),(a=s.get("*"))&&a.slice().map(function(e){e(t,o)})}}}const V=T(),N={name:"AddUserForm",data(){return{formData:{name:"",email:"",phone:"",position_id:null,photo:null},errors:[],positions:[],imagePreview:null,isLoading:!0}},created(){this.fetchPositions()},methods:{async createUser(){this.errors=[],this.isLoading=!0;const s=await this.getToken(),t=new FormData;for(let o in this.formData)t.append(o,this.formData[o]);try{const o=await this.$axios.post("/api/users",t,{headers:{token:s}});o.data.success&&(this.clear(),V.emit("userAdded",o.data.user),this.$toast(o.data.message,{type:"success"}))}catch(o){o.response.status===422?this.errors=o.response.data.errors:console.error("Error adding user:",o),this.$toast(o.response.data.message,{type:"error"})}finally{this.isLoading=!1}},clear(){for(let s in this.formData)this.formData[s]="";this.errors=[],this.imagePreview=null},onFileSelected(s){const t=s.target.files[0];if(t){const o=new FileReader;o.onload=a=>{this.imagePreview=a.target.result},o.readAsDataURL(t)}},async getToken(){try{return(await this.$axios.get("/api/token")).data.token}catch(s){return console.error("Error fetching token:",s),null}},async fetchPositions(){this.isLoading=!0;try{const s=await this.$axios.get("/api/positions");s.data.success&&(this.positions=s.data.positions)}catch(s){console.error("Error fetching positions:",s)}finally{this.isLoading=!1}}}},B={style:{position:"relative"}},M={key:0,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",display:"flex","align-items":"center","justify-content":"center","background-color":"rgba(255, 255, 255, 0.8)","z-index":"9999"}};function q(s,t,o,a,e,m){const h=n("v-progress-circular"),u=n("v-text-field"),g=n("v-select"),f=n("v-file-input"),b=n("v-img"),y=n("v-btn");return _(),x("div",B,[e.isLoading?(_(),x("div",M,[r(h,{indeterminate:"",size:"64",color:"primary"})])):D("",!0),c("form",null,[r(u,{modelValue:e.formData.name,"onUpdate:modelValue":t[0]||(t[0]=l=>e.formData.name=l),"error-messages":e.errors.name,label:"Name",required:""},null,8,["modelValue","error-messages"]),r(u,{modelValue:e.formData.email,"onUpdate:modelValue":t[1]||(t[1]=l=>e.formData.email=l),"error-messages":e.errors.email,label:"E-mail",required:""},null,8,["modelValue","error-messages"]),r(u,{modelValue:e.formData.phone,"onUpdate:modelValue":t[2]||(t[2]=l=>e.formData.phone=l),"error-messages":e.errors.phone,label:"Phone",required:""},null,8,["modelValue","error-messages"]),r(g,{modelValue:e.formData.position_id,"onUpdate:modelValue":t[3]||(t[3]=l=>e.formData.position_id=l),"error-messages":e.errors.position_id,items:e.positions,"item-title":"name","item-value":"id",label:"Position",required:""},null,8,["modelValue","error-messages","items"]),r(f,{modelValue:e.formData.photo,"onUpdate:modelValue":t[4]||(t[4]=l=>e.formData.photo=l),"error-messages":e.errors.photo,accept:"image/*",label:"Upload photo","prepend-icon":"mdi-camera",onChange:m.onFileSelected},null,8,["modelValue","error-messages","onChange"]),e.imagePreview?(_(),U(b,{key:0,src:e.imagePreview,"max-height":"300","max-width":"300",class:"mt-4"},null,8,["src"])):D("",!0),r(y,{class:"me-4",onClick:I(m.createUser,["prevent"])},{default:i(()=>[v(" submit ")]),_:1},8,["onClick"]),r(y,{onClick:m.clear},{default:i(()=>[v("clear")]),_:1},8,["onClick"])])])}const z=w(N,[["render",q]]),S={data(){return{perPage:6,users:[],meta:{},loading:!1,totalItems:0,headers:[{title:"ID",key:"id"},{title:"Avatar",key:"photo"},{title:"Name",key:"name"},{title:"Email",key:"email"},{title:"Phone",key:"phone"},{title:"Position",key:"position"}],dialog:!1,selectedUser:{}}},created(){V.on("userAdded",()=>{this.loadItems({page:1,itemsPerPage:this.perPage})}),this.loadItems({page:1,itemsPerPage:this.perPage})},methods:{loadItems({page:s,itemsPerPage:t}){this.loading=!0,this.$axios.get("/api/users",{params:{page:s,count:t}}).then(o=>{this.users=o.data.users,this.meta=o.data,this.totalItems=o.data.total_users}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})},loadMore(){this.loading=!0,this.$axios.get("/api/users",{params:{page:this.meta.page+1,count:this.perPage}}).then(s=>{this.users=[...this.users,...s.data.users],this.meta=s.data}).catch(s=>{console.error(s)}).finally(()=>{this.loading=!1})},showUserDetails(s){this.$axios.get(`/api/users/${s}`).then(t=>{this.selectedUser=t.data.user,this.dialog=!0}).catch(t=>{console.error(t)}).finally(()=>{this.loading=!1})}}},j=["onClick"];function H(s,t,o,a,e,m){const h=n("v-img"),u=n("v-avatar"),g=n("v-data-table-server"),f=n("v-btn"),b=n("v-icon"),y=n("v-card-title"),l=n("v-card-subtitle"),P=n("v-card-text"),C=n("v-card"),F=n("v-dialog"),A=n("v-container");return _(),U(A,null,{default:i(()=>[r(g,{headers:e.headers,items:e.users,"items-length":e.totalItems,loading:e.loading,"hide-default-footer":"","onUpdate:options":m.loadItems},{body:i(({items:k})=>[(_(!0),x(L,null,E(k,p=>(_(),x("tr",{key:p.id,onClick:K=>m.showUserDetails(p.id),style:{cursor:"pointer"}},[c("td",null,d(p.id),1),c("td",null,[r(u,{size:"36"},{default:i(()=>[r(h,{src:p.photo},null,8,["src"])]),_:2},1024)]),c("td",null,d(p.name),1),c("td",null,d(p.email),1),c("td",null,d(p.phone),1),c("td",null,d(p.position),1)],8,j))),128))]),_:1},8,["headers","items","items-length","loading","onUpdate:options"]),e.meta.page<e.meta.total_pages?(_(),U(f,{key:0,onClick:m.loadMore,loading:e.loading,block:""},{default:i(()=>[v(" Show More ")]),_:1},8,["onClick","loading"])):D("",!0),r(F,{modelValue:e.dialog,"onUpdate:modelValue":t[1]||(t[1]=k=>e.dialog=k),"max-width":"500px"},{default:i(()=>[r(C,null,{default:i(()=>[r(y,{class:"d-flex justify-space-between align-center"},{default:i(()=>[c("span",null,d(e.selectedUser.name),1),r(f,{icon:"",onClick:t[0]||(t[0]=k=>e.dialog=!1)},{default:i(()=>[r(b,null,{default:i(()=>[v("mdi-close")]),_:1})]),_:1})]),_:1}),r(l,{class:"text-center"},{default:i(()=>[v(d(e.selectedUser.position),1)]),_:1}),r(P,{class:"text-center"},{default:i(()=>[r(u,{size:"72",class:"mx-auto mb-4"},{default:i(()=>[r(h,{src:e.selectedUser.photo},null,8,["src"])]),_:1}),c("div",null,"Email: "+d(e.selectedUser.email),1),c("div",null,"Phone: "+d(e.selectedUser.phone),1)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}const R=w(S,[["render",H],["__scopeId","data-v-f2a14169"]]),O={name:"Home",components:{AddUserForm:z,UsersTable:R}},G=c("h1",{class:"text-center pa-5"},"Test Assignment - Users Database",-1);function J(s,t,o,a,e,m){const h=n("AddUserForm"),u=n("UsersTable"),g=n("v-container"),f=n("v-main");return _(),U(f,null,{default:i(()=>[r(g,null,{default:i(()=>[G,r(h),r(u)]),_:1})]),_:1})}const W=w(O,[["render",J]]);export{W as default};
