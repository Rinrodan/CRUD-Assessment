
## Docker and Postgres Image

```bash
$ docker run -itd -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5600:5600 -v --name postgres postgres

# created container
993a9185cd505c599605b2df111d4796e2f48ba907a2ed389f923db44b1d3e10
$ docker exec -it 993a9 bash
```


```json
{
  	"id" : 1,
	"item_userid" : 2,
  	"item_name" : "Needle Nose Pliers",
	"item_description" : "These arent regular pliers, they are more pointy!",
	"item_quantity" : 22
}
```

```json
{ 
    "first_name" : "postedfirstname",
    "last_name" : "postedlastname",
    "username" : "posteduser",
    "password" : "password"
}
```

```json
    {
      "item_userid":1,
      "item_name":"trash",
      "item_description":"A pile of trash nobody wants",
      "item_quantity":1
    }
```


