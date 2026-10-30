import test from "node:test";
import assert from "node:assert/strict";
import { sendToWeb3Forms, web3FormsPayload, WEB3FORMS_ENDPOINT } from "../src/lib/web3forms";
const lead = {fullName:"Pessoa Teste",phone:"11987654321",companyName:"Empresa Teste",email:"",companyRole:"Outro" as const,lossRange:"Ainda não sei" as const,bankContacted:"Ainda não" as const};
test("Web3Forms includes all case details and omits absent optional email", () => {
 const body = web3FormsPayload(lead);
 assert.equal(body.name,lead.fullName);
 assert.equal("email" in body,false);
 assert.ok(body.message.includes(lead.phone));
 assert.ok(body.message.includes(lead.companyName));
 assert.equal(body.botcheck,false);
});
test("Web3Forms only confirms explicit provider success", async () => {
 for (const [status, success] of [[200,false],[400,false],[500,true]] as const) {
  await assert.rejects(sendToWeb3Forms(lead,async()=>new Response(JSON.stringify({success}),{status})));
 }
 await assert.rejects(sendToWeb3Forms(lead,async()=>{throw new Error("Network") }));
 await assert.rejects(sendToWeb3Forms(lead,async()=>new Response("invalid json")));
 await sendToWeb3Forms(lead,async(url,options)=>{
  assert.equal(url,WEB3FORMS_ENDPOINT);
  assert.equal(options?.method,"POST");
  return new Response(JSON.stringify({success:true}),{status:200});
 });
});
