import{_ as y,o as d,c as b,a as n,b as v,d as D,e as f,w as l,f as k,g as P,r as a}from"./app-BDy10lGA.js";function V(e){return{all:e=e||new Map,on:function(s,t){var r=e.get(s);r?r.push(t):e.set(s,[t])},off:function(s,t){var r=e.get(s);r&&(t?r.splice(r.indexOf(t)>>>0,1):e.set(s,[]))},emit:function(s,t){var r=e.get(s);r&&r.slice().map(function(o){o(t)}),(r=e.get("*"))&&r.slice().map(function(o){o(s,t)})}}}const x=V(),w={name:"AddUserForm",data(){return{formData:{name:"",email:"",phone:"",position_id:null,photo:null},errors:[],positions:[],imagePreview:null,isLoading:!0}},created(){this.fetchPositions()},methods:{async createUser(){this.errors=[],this.isLoading=!0;const e=await this.getToken(),s=new FormData;for(let t in this.formData)s.append(t,this.formData[t]);try{const t=await this.$axios.post("/api/users",s,{headers:{token:e}});t.data.success&&(this.clear(),x.emit("userAdded",t.data.user),this.$toast(t.data.message,{type:"success"}))}catch(t){t.response.status===422?(this.errors=t.response.data.errors,console.log(this.errors)):console.error("Error adding user:",t),this.$toast(t.response.data.message,{type:"error"})}finally{this.isLoading=!1}},clear(){for(let e in this.formData)this.formData[e]=null;this.errors=[],this.imagePreview=null},onFileSelected(e){const s=e.target.files[0];if(s){const t=new FileReader;t.onload=r=>{this.imagePreview=r.target.result},t.readAsDataURL(s)}},async getToken(){try{return(await this.$axios.get("/api/token")).data.token}catch(e){return console.error("Error fetching token:",e),null}},async fetchPositions(){this.isLoading=!0;try{const e=await this.$axios.get("/api/positions");e.data.success&&(this.positions=e.data.positions)}catch(e){console.error("Error fetching positions:",e)}finally{this.isLoading=!1}}}},U={style:{position:"relative"}},C={key:0,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",display:"flex","align-items":"center","justify-content":"center","background-color":"rgba(255, 255, 255, 0.8)","z-index":"9999"}};function A(e,s,t,r,o,m){const p=a("v-progress-circular"),c=a("v-text-field"),u=a("v-select"),h=a("v-file-input"),_=a("v-img"),g=a("v-btn");return d(),b("div",U,[o.isLoading?(d(),b("div",C,[n(p,{indeterminate:"",size:"64",color:"primary"})])):v("",!0),D("form",null,[n(c,{modelValue:o.formData.name,"onUpdate:modelValue":s[0]||(s[0]=i=>o.formData.name=i),"error-messages":o.errors.name,label:"Name",required:""},null,8,["modelValue","error-messages"]),n(c,{modelValue:o.formData.email,"onUpdate:modelValue":s[1]||(s[1]=i=>o.formData.email=i),"error-messages":o.errors.email,label:"E-mail",required:""},null,8,["modelValue","error-messages"]),n(c,{modelValue:o.formData.phone,"onUpdate:modelValue":s[2]||(s[2]=i=>o.formData.phone=i),"error-messages":o.errors.phone,label:"Phone",required:""},null,8,["modelValue","error-messages"]),n(u,{modelValue:o.formData.position_id,"onUpdate:modelValue":s[3]||(s[3]=i=>o.formData.position_id=i),"error-messages":o.errors.position_id,items:o.positions,"item-title":"name","item-value":"id",label:"Position",required:""},null,8,["modelValue","error-messages","items"]),n(h,{modelValue:o.formData.photo,"onUpdate:modelValue":s[4]||(s[4]=i=>o.formData.photo=i),"error-messages":o.errors.photo,accept:"image/*",label:"Upload photo","prepend-icon":"mdi-camera",onChange:m.onFileSelected},null,8,["modelValue","error-messages","onChange"]),o.imagePreview?(d(),f(_,{key:0,src:o.imagePreview,"max-height":"300","max-width":"300",class:"mt-4"},null,8,["src"])):v("",!0),n(g,{class:"me-4",onClick:P(m.createUser,["prevent"])},{default:l(()=>[k(" submit ")]),_:1},8,["onClick"]),n(g,{onClick:m.clear},{default:l(()=>[k("clear")]),_:1},8,["onClick"])])])}const F=y(w,[["render",A]]),I={data(){return{perPage:10,users:[],meta:{},loading:!1,totalItems:0,headers:[{title:"ID",key:"id"},{title:"Avatar",key:"photo"},{title:"Name",key:"name"},{title:"Email",key:"email"},{title:"Phone",key:"phone"},{title:"Position",key:"position"}]}},created(){x.on("userAdded",()=>{this.loadItems({page:1,itemsPerPage:this.perPage})}),this.loadItems({page:1,itemsPerPage:this.perPage})},methods:{loadItems({page:e,itemsPerPage:s}){this.loading=!0,this.$axios.get("/api/users",{params:{page:e,count:s}}).then(t=>{this.users=t.data.users,this.meta=t.data,this.totalItems=t.data.total_users}).catch(t=>{console.error(t)}).finally(()=>{this.loading=!1})},loadMore(){this.loading=!0,this.$axios.get("/api/users",{params:{page:this.meta.page+1,count:this.perPage}}).then(e=>{this.users=[...this.users,...e.data.users],this.meta=e.data}).catch(e=>{console.error(e)}).finally(()=>{this.loading=!1})}}};function E(e,s,t,r,o,m){const p=a("v-img"),c=a("v-avatar"),u=a("v-data-table-server"),h=a("v-btn"),_=a("v-container");return d(),f(_,null,{default:l(()=>[n(u,{headers:o.headers,items:o.users,"items-length":o.totalItems,loading:o.loading,"hide-default-footer":"","onUpdate:options":m.loadItems},{"item.photo":l(({item:g})=>[n(c,{size:"36"},{default:l(()=>[n(p,{src:g.photo},null,8,["src"])]),_:2},1024)]),_:1},8,["headers","items","items-length","loading","onUpdate:options"]),o.meta.page<o.meta.total_pages?(d(),f(h,{key:0,onClick:m.loadMore,loading:o.loading,block:""},{default:l(()=>[k(" Show More ")]),_:1},8,["onClick","loading"])):v("",!0)]),_:1})}const L=y(I,[["render",E]]),N={name:"Home",components:{AddUserForm:F,UsersTable:L}};function T(e,s,t,r,o,m){const p=a("AddUserForm"),c=a("UsersTable"),u=a("v-container"),h=a("v-main");return d(),f(h,null,{default:l(()=>[n(u,null,{default:l(()=>[n(p),n(c)]),_:1})]),_:1})}const M=y(N,[["render",T]]);export{M as default};
