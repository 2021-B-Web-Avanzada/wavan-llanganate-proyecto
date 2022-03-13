import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { OPTIONS } from "src/app/shared/constants/constant";
import { Convenio } from "../interfaces/convenio.interface";
    

@Injectable({
  providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class ConvenioService {

    tableName = OPTIONS.convenios.table;
    private supabaseClient: SupabaseClient;

    constructor(
        private http: HttpClient
    ){
        this.supabaseClient = createClient(environment.supabase.url, environment.supabase.apiSecret);
    }

    async post(obj: Convenio){
        const { data, error } = await this.supabaseClient
        .from<Convenio>(this.tableName)
        .insert(obj);
        return {data, error};
    }

    async get() {
        let { data, error } = await this.supabaseClient
          .from<Convenio>(this.tableName)
          .select('*')
          .limit(10)
        return { data, error };
      }
    
      async delete(id: number) {
        const data = await this.supabaseClient
          .from(this.tableName)
          .delete()
          .match({ id: id })
        return data
      }
    
      async update(obj: Convenio) {
        const { data, error } = await this.supabaseClient
          .from(this.tableName)
          .update(obj)
          .match({ id: obj.id })
      }
}