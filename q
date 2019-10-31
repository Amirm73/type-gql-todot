#not valid email has no effect

#formatErorr  index.ts 

#login.ts ! mark : Object is possibly 'undefined'.ts(2532)  : field was not implicit definition

#CHROEM OK  FIREFOX NOK : include

#class validator :remove reinstall

#min : number

#insert voilate foriegn key: object is in ralation with another object,should create new object
..............................
errors:
?Cannot return null for non-nullable field Todo.name.
#return null object or sth like @Culumn(  {select:false})


?import { CreateTodoResolver } from "src/modules/todo/CreateTodo"; not found!
#import { CreateTodoResolver } from "../modules/todo/CreateTodo";


?"syntax error at or near \".\
#was returning null

?registerUser.ts
Resolver()
export class RegisterUserResolver extends BaseCreateUser {
    sendEmail(email, await createConfirmationUrl(user.id));
}
#callback[0](backtick arg[0]) 
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


@Resolver(User)
export class GetUsersResolver {
  @Query(() => [User], { nullable: true })
  async getAllUsers(@Info() data: any): Promise< any> {
    ion"]["selectionSet"]["selections"]["selectionSet"];
    const sets = data["operation"]["selectionSet"]["selections"];
    console.log(sets);
  }
}

---------------------------------------------------
libs:
https://www.npmjs.com/package/graphql-fields
