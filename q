#not valid email has no effect

#formatErorr  index.ts 

#login.ts ! mark : Object is possibly 'undefined'.ts(2532)  : field was not implicit definition

#CHROEM OK  FIREFOX NOK : include

#class validator :remove reinstall

#min : number

#insert voilate foriegn key: object is in ralation with another object,should create new object
..............................


proper err message for login.ts for ifs

registerUser.ts
Resolver()
export class RegisterUserResolver extends BaseCreateUser {
  
    sendEmail(email, await createConfirmationUrl(user.id));
}

import { CreateTodoResolver } from "src/modules/todo/CreateTodo"; not found!
import { CreateTodoResolver } from "../modules/todo/CreateTodo";

--------------------------------------------
vim paste without new line

const tags = await Tag.findByIds(tagIds);
const todo = await Todo.findOneOrFail(todoId);
todo.tags = tags;
return await Todo.save(todo);

type gql snippet?
--------------
login.ts:  when return res() of promise ?


https://github.com/MichalLytek/type-graphql/issues/314

------------------------------------------
doc notes:
1: RelationColumn
@ManyToOne(type => User)
  author: User;
  @RelationColumn()
  authorId: number;

2 : throw error
if(!User){
    throw new Error('not found')
}



