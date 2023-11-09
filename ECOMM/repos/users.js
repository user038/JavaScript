import fs from "fs";
import crypto from "crypto";
import util from "util";

const scrypt = util.promisify(crypto.scrypt);

class usersRepo{
    constructor(filename){
        this.filename = filename;
        try{
            fs.readFileSync(this.filename);
        }catch(e){
            fs.writeFileSync(this.filename,'[]');
        }
    }

    async getAll(){
        return JSON.parse(await fs.promises.readFile(this.filename,{
            encoding: 'utf8'
        }))
    }

    async randomId(){
            const randomId = crypto.randomBytes(4).toString('hex');
            return randomId;
    }

    async create(attributes){
        attributes.id = await this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buf  = await scrypt(attributes.password, salt, 64, )

        const records = await this.getAll();
        const record = {
            ...attributes,
            password : `${buf.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);

        return attributes;
    }

    async comparePass(saved,supplied){
        const [hashed,salt] = saved.split('.');
        const hashedSupplied = await scrypt(supplied,salt,64);
        return hashedSupplied.toString('hex') === hashed;
        
    }

    async writeAll(records){
        return await fs.promises.writeFile(this.filename,JSON.stringify(records,null,2));
    }

    async delete(id){
        const records = await this.getAll();
        const filteredRecords = records.filter(record=>record.id !== id);
        return await fs.promises.writeFile(this.filename,filteredRecords);

    }

    async getOne(id){
        const records = await this.getAll();
        const user =  records.find(record=>record.id === id);
        return user;
    }

    async update(id,attributes){
        const records = await this.getAll();
        const user =  records.find(rec=>rec.id === id);
        if(!rec){
            throw new Error('record not found');
        }    
        Object.assign(rec,attributes);  
        await this.writeAll(records);
    }

    async getOneBy(filters){
        const records = await this.getAll();
        for(let rec of records){
            let found = true;
            for(let key in filters){
                if(rec[key] !== filters[key]){
                    found = false;
                }
            }
            if(found){
                return rec;
            }
        }
    }

}

// const test = async ()=>{
//     const repo = new usersRepo('users.json');
//     // await repo.create({email:"test@test.com", password:"password"});
//     // const user = await repo.getAll();
//     // console.log(user);
//     // const user1 = await repo.getOne("f3997296");
//     // console.log(user1);

//     const user2 = await repo.getOneBy({id:"c4f82ec1"})
//     console.log(user2);
// }

// test();

export default  new usersRepo('users.json');