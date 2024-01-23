/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      "id":1,
      "item_userid":4,
      "item_name":"Wood",
      "item_description":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "item_quantity":97
    },
    {
      "id":2,
      "item_userid":3,
      "item_name":"Rubber",
      "item_description":"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      "item_quantity":72
    },
    {
      "id":3,
      "item_userid":4,
      "item_name":"Granite",
      "item_description":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      "item_quantity":44
    
    },
    {
      "id":4,
      "item_userid":1,
      "item_name":"Aluminum",
      "item_description":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "item_quantity":65
    },
    {
      "id":5,
      "item_userid":4,
      "item_name":"Vinyl",
      "item_description":"Phasellus in felis. Donec semper sapien a libero. Nam Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "item_quantity":93
    },
    {
      "id":6,
      "item_userid":4,
      "item_name":"Brass",
      "item_description":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "item_quantity":79 
    },
    {
      "id":7,
      "item_userid":1,
      "item_name":"Brass",
      "item_description":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "item_quantity":40
    },
    {
      "id":8,
      "item_userid":4,
      "item_name":"Stone",
      "item_description":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "item_quantity":25
    },
    {
      "id":9,
      "item_userid":1,
      "item_name":"Granite",
      "item_description":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
      "item_quantity":89
    },
    {
      "id":10,
      "item_userid":4,
      "item_name":"Brass",
      "item_description":"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. ",
      "item_quantity":60
    },
    {
      "id":11,
      "item_userid":3,
      "item_name":"Brass",
      "item_description":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
      "item_quantity":79
    },
    {
      "id":12,
      "item_userid":2,
      "item_name":"Aluminum",
      "item_description":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
      "item_quantity":48
    },
    {
      "id":13,
      "item_userid":2,
      "item_name":"Rubber",
      "item_description":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      "item_quantity":70
    },
    {
      "id":14,
      "item_userid":1,
      "item_name":"Glass",
      "item_description":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      "item_quantity":18
    },
    {
      "id":15,
      "item_userid":2,
      "item_name":"Steel",
      "item_description":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "item_quantity":71
    },
    {
      "id":16,
      "item_userid":1,
      "item_name":"Granite",
      "item_description":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      "item_quantity":28
    },
    {
      "id":17,
      "item_userid":2,
      "item_name":"Plastic",
      "item_description":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
      "item_quantity":93
    },
    {
      "id":18,
      "item_userid":1,
      "item_name":"Glass",
      "item_description":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Integer aliquet, massa id lobortis convallis",
      "item_quantity":26
    },
    {
      "id":19,
      "item_userid":1,
      "item_name":"Glass",
      "item_description":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      "item_quantity":69
    },
    {
      "id":20,
      "item_userid":1,
      "item_name":"Plastic",
      "item_description":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "item_quantity":88
    },
    {
      "id":21,
      "item_userid":4,
      "item_name":"Plastic",
      "item_description":"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "item_quantity":80
    },
    {
      "id":22,
      "item_userid":1,
      "item_name":"Plexiglass",
      "item_description":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes",
      "item_quantity":55
    },
    {
      "id":23,
      "item_userid":2,
      "item_name":"Glass",
      "item_description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
      "item_quantity":59
    },
    {
      "id":24,
      "item_userid":2,
      "item_name":"Stone",
      "item_description":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis or.",
      "item_quantity":49
    },
    {
      "id":25,
      "item_userid":4,
      "item_name":"Aluminum",
      "item_description":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      "item_quantity":93
    }
  ]);
};
