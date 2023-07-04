"use strict";(self.webpackChunkgocharm_front=self.webpackChunkgocharm_front||[]).push([[3],{"./src/components/ui/selections/Checkbox/Checkbox.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Checked:function(){return Checked},NotChecked:function(){return NotChecked},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Checkbox_stories}});var _NotChecked$parameter,_NotChecked$parameter2,_NotChecked$parameter3,_Checked$parameters,_Checked$parameters2,_Checked$parameters2$,objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),CheckIcon=__webpack_require__("./src/components/icons/CheckIcon.tsx"),tw_merge=__webpack_require__("./src/libs/tw-merge.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Checkbox(_ref){var id=_ref.id,register=_ref.register,className=_ref.className,name=_ref.name,control=_ref.control,rules=_ref.rules,field=(0,index_esm.bc)({control:control,name:name,rules:rules}).field,_useState=(0,react.useState)(field.value||!1),_useState2=(0,slicedToArray.Z)(_useState,2),checked=_useState2[0],setChecked=_useState2[1];console.log(field.value);return(0,jsx_runtime.jsxs)("label",{htmlFor:id,className:(0,tw_merge.E)("flex h-[2.4rem] w-[2.4rem]  cursor-pointer items-center justify-center rounded-[0.3rem] border border-custom-background-200",checked&&"border-none bg-custom-main-500",className),children:[(0,jsx_runtime.jsx)("input",(0,objectSpread2.Z)((0,objectSpread2.Z)({},register),{},{id:id,checked:checked,type:"checkbox",className:"hidden",onChange:function handleChange(e){setChecked((function(prevChecked){return!prevChecked})),field.onChange(e)}})),(0,jsx_runtime.jsx)(CheckIcon.Z,{color:"white",className:checked?"visible":"hidden"})]})}try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},register:{defaultValue:null,description:"",name:"register",required:!1,type:{name:"UseFormRegisterReturn<string>"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},control:{defaultValue:null,description:"",name:"control",required:!0,type:{name:"Control<any, any>"}},rules:{defaultValue:null,description:"",name:"rules",required:!1,type:{name:"RegisterOptions<FieldValues, string>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ui/selections/Checkbox/Checkbox.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/components/ui/selections/Checkbox/Checkbox.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}var Checkbox_stories={title:"UI/Selections/Checkbox",component:Checkbox,tags:["autodocs"]},NotChecked={render:function render(){var _useForm=(0,index_esm.cI)({defaultValues:{checkbox1:!1}}),control=_useForm.control,checked=(0,_useForm.watch)("checkbox1");return(0,jsx_runtime.jsxs)("div",{children:[checked&&(0,jsx_runtime.jsx)("p",{className:"mb-10",children:"Checked!"}),!checked&&(0,jsx_runtime.jsx)("p",{className:"mb-10",children:"Not checked!"}),(0,jsx_runtime.jsx)(Checkbox,{id:"checkbox1",control:control,name:"checkbox1"})]})}},Checked={render:function render(){var _useForm2=(0,index_esm.cI)({defaultValues:{checkbox2:!0}}),control=_useForm2.control,checked=(0,_useForm2.watch)("checkbox2");return(0,jsx_runtime.jsxs)("div",{children:[checked&&(0,jsx_runtime.jsx)("p",{className:"mb-10",children:"Checked!"}),!checked&&(0,jsx_runtime.jsx)("p",{className:"mb-10",children:"Not checked!"}),(0,jsx_runtime.jsx)(Checkbox,{id:"checkbox2",control:control,name:"checkbox2"})]})}};NotChecked.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},NotChecked.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_NotChecked$parameter=NotChecked.parameters)||void 0===_NotChecked$parameter?void 0:_NotChecked$parameter.docs),{},{source:(0,objectSpread2.Z)({originalSource:'{\n  render: () => {\n    type FormData = {\n      checkbox1: boolean;\n    };\n    const {\n      control,\n      watch\n    } = useForm<FormData>({\n      defaultValues: {\n        checkbox1: false\n      }\n    });\n    const checked = watch(\'checkbox1\');\n    return <div>\n        {checked && <p className="mb-10">Checked!</p>}\n        {!checked && <p className="mb-10">Not checked!</p>}\n\n        <Checkbox id="checkbox1" control={control} name="checkbox1" />\n      </div>;\n  }\n}'},null===(_NotChecked$parameter2=NotChecked.parameters)||void 0===_NotChecked$parameter2||null===(_NotChecked$parameter3=_NotChecked$parameter2.docs)||void 0===_NotChecked$parameter3?void 0:_NotChecked$parameter3.source)})}),Checked.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Checked.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_Checked$parameters=Checked.parameters)||void 0===_Checked$parameters?void 0:_Checked$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:'{\n  render: () => {\n    type FormData = {\n      checkbox2: boolean;\n    };\n    const {\n      control,\n      watch\n    } = useForm<FormData>({\n      defaultValues: {\n        checkbox2: true\n      }\n    });\n    const checked = watch(\'checkbox2\');\n    return <div>\n        {checked && <p className="mb-10">Checked!</p>}\n        {!checked && <p className="mb-10">Not checked!</p>}\n\n        <Checkbox id="checkbox2" control={control} name="checkbox2" />\n      </div>;\n  }\n}'},null===(_Checked$parameters2=Checked.parameters)||void 0===_Checked$parameters2||null===(_Checked$parameters2$=_Checked$parameters2.docs)||void 0===_Checked$parameters2$?void 0:_Checked$parameters2$.source)})});var __namedExportsOrder=["NotChecked","Checked"]},"./src/components/icons/CheckIcon.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return CheckIcon}});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");function CheckIcon(_ref){var color=_ref.color,className=_ref.className;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",className:className,xmlns:"http://www.w3.org/2000/svg",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g",{id:"check-24",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path",{id:"Vector (Stroke)",fillRule:"evenodd",clipRule:"evenodd",d:"M18.3977 7.10225C18.6174 7.32192 18.6174 7.67808 18.3977 7.89775L10.1477 16.1477C9.92808 16.3674 9.57192 16.3674 9.35225 16.1477L5.60225 12.3977C5.38258 12.1781 5.38258 11.8219 5.60225 11.6023C5.82192 11.3826 6.17808 11.3826 6.39775 11.6023L9.75 14.9545L17.6023 7.10225C17.8219 6.88258 18.1781 6.88258 18.3977 7.10225Z",fill:color||"#757575",stroke:color||"#757575",strokeLinecap:"round",strokeLinejoin:"round"})})})}try{CheckIcon.displayName="CheckIcon",CheckIcon.__docgenInfo={description:"",displayName:"CheckIcon",props:{color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/CheckIcon.tsx#CheckIcon"]={docgenInfo:CheckIcon.__docgenInfo,name:"CheckIcon",path:"src/components/icons/CheckIcon.tsx#CheckIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/libs/tw-merge.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:function(){return twMergeCustom}});var twMergeCustom=(0,__webpack_require__("./node_modules/tailwind-merge/dist/lib/extend-tailwind-merge.mjs").q)({classGroups:{"font-size":["text-hero","text-heading1","text-heading2","text-heading3","text-subheading","text-body1","text-body2","text-body3","text-body4","text-body5","text-caption"]}})}}]);