import React from "react";
import { List, Avatar, Row, Card, Col, Typography } from "antd";

const Tasks = (props) => {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col span={14} style={{ verticalAlign: "middle" }}>
        {" "}
        <Card title="Tasks">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={props.data}
            renderItem={(item) => (
              <List.Item
                key={item.name}
                //   extra={
                //     <img
                //       width={272}
                //       alt="logo"
                //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                //   }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={`/tasks/${item.id}`}>{item.name}</a>}
                  description={
                    <Typography.Text autosize={{ maxRows: "5" }}>
                      {item.username}
                    </Typography.Text>
                  }
                />
                {item.content}
              </List.Item>
            )}
          />{" "}
        </Card>
      </Col>
    </Row>
  );
};

export default Tasks;
