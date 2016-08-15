module.exports = 
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "博宇",
    "description": "描述",
    "termOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Yaotian"
    },
    "license": {
      "name": "MIT"
    }
  },
  "host": "boyu.localhost",
  "basePath": "/api",
  "tags": [
    {
      "name": "Student",
      "description": "学生、家长相关"
    },
    {
      "name": "Teacher",
      "description": "教师相关"
    },
    {
      "name": "News",
      "description": "消息相关"
    },
    {
      "name": "Plan",
      "description": "规划相关"
    }
  ],
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/StudentApi/scheduleList": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "根据日期获取课程、考试、活动、约谈信息[完成]",
        "parameters": [
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx-xx",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type": "array",
              "items": {
                "$ref": "#/definitions/Schedule"
              }
            }
          }
        }
      }
    },
    "/StudentApi/courseDate": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "根据月份获取一个月内有课程、考试、活动、约谈的日期[完成]",
        "parameters": [
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type": "array",
              "items": {
                "$ref": "#/definitions/CourseDate"
              }
            }
          }
        }
      }
    },
    "/StudentApi/busyDate": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "获取一个月内的繁忙日期信息[完成]",
        "parameters": [
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx,如2016-09",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "返回的是一个整数数组",
            "schema": {
              "type": "array",
              "items": {
                "type": "integer"
              }
            }
          }
        }
      }
    },
    "/StudentApi/addBusyDate": {
      "post": {
        "tags": [
          "Student"
        ],
        "summary": "添加繁忙日期信息[完成]",
        "parameters": [
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx-xx",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/BaseModel"
            }
          }
        }
      }
    },
    "/StudentApi/courseDetail": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "获取课程详情[完成]",
        "parameters": [
          {
            "name": "course_id",
            "in": "query",
            "description": "课程id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Course"
            }
          }
        }
      }
    },
    "/StudentApi/examDetail": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "获取考试详情[完成]",
        "parameters": [
          {
            "name": "exam_id",
            "in": "query",
            "description": "考试id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Examination"
            }
          }
        }
      }
    },
    "/StudentApi/activityDetail": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "获取活动详情[完成]",
        "parameters": [
          {
            "name": "activity_id",
            "in": "query",
            "description": " 活动id",
            "required": true,
            "type": "number",
            "format": "int32 "
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Activity"
            }
          }
        }
      }
    },
    "/StudentApi/meetingDetail": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "获取约见详情[完成]",
        "parameters": [
          {
            "name": "meeting_id",
            "in": "query",
            "description": "约见id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Meeting"
            }
          }
        }
      }
    },
    "/StudentApi/applyLeave": {
      "post": {
        "tags": [
          "Student"
        ],
        "summary": "改期请假申请[完成]",
        "parameters": [
          {
            "name": "student_id",
            "in": "query",
            "description": "学生id",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "target_id",
            "in": "query",
            "description": "课程、考试、活动或约谈id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "type",
            "in": "query",
            "description": "请假或调课（0-请假，1-改期）",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "target_type",
            "in": "query",
            "description": "类型（1-课程，2-考试,3-活动,4-约谈）",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "original_date",
            "in": "query",
            "description": "原课程日期",
            "required": true,
            "type": "string"
          },
          {
            "name": "original_time",
            "in": "query",
            "description": "原课程时间",
            "required": true,
            "type": "string"
          },
          {
            "name": "expect_date",
            "in": "query",
            "description": "期望日期",
            "type": "string"
          },
          {
            "name": "expect_time",
            "in": "query",
            "description": "期望时间",
            "type": "string"
          },
          {
            "name": "reason",
            "in": "query",
            "description": "请假或改期原因",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/BaseModel"
            }
          }
        }
      }
    },
    "/StudentApi/studentInfo": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "学生信息(我的)[完成]",
        "parameters": [
          {
            "name": "student_id",
            "description": "学生id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/Student"
            }
          }
        }
      }
    },

    "/TeacherApi/scheduleList": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "根据日期获取课程、考试、活动、约谈信息[完成]",
        "parameters": [
          {
            "name": "teacher_id",
            "in": "query",
            "description": "教师id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx-xx",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type": "array",
              "items": {
                "$ref": "#/definitions/TeacherSchedule"
              }
            }
          }
        }
      }
    },
    "/TeacherApi/courseDate": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "根据月份获取一个月内有课程、考试、活动、约谈的日期[完成]",
        "parameters": [
          {
            "name": "teacher_id",
            "in": "query",
            "description": "老师id",
            "required": true,
            "type": "number",
            "format": "int32 "
          },
          {
            "name": "date",
            "in": "query",
            "description": "日期,格式为xxxx-xx",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type": "array",
              "items": {
                "$ref": "#/definitions/CourseDate"
              }
            }
          }
        }
      }
    },
    "/TeacherApi/courseDetail": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "获取课程详情",
        "parameters": [
          {
            "name": "course_id",
            "in": "query",
            "description": "课程id",
            "required": true,
            "type": "number",
            "format": "int32 "
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Course"
            }
          }
        }
      }
    },
    "/TeacherApi/examDetail": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "获取考试详情",
        "parameters": [
          {
            "name": "exam_id",
            "in": "query",
            "description": "考试id",
            "required": true,
            "type": "number",
            "format": "int32 "
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Examination"
            }
          }
        }
      }
    },
    "/TeacherApi/activityDetail": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "获取活动详情",
        "parameters": [
          {
            "name": "activity_id",
            "in": "query",
            "description": " 活动id",
            "required": true,
            "type": "number",
            "format": "int32 "
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Activity"
            }
          }
        }
      }
    },
    "/TeacherApi/meetingDetail": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "获取约见详情",
        "parameters": [
          {
            "name": "meeting_id",
            "in": "query",
            "description": "约见id",
            "required": true,
            "type": "number",
            "format": "int32 "
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Meeting"
            }
          }
        }
      }
    },

    "/PlanApi/getPlan": {
      "get": {
        "tags": [
          "Plan"
        ],
        "summary": "获取学生规划[完成]",
        "parameters": [
          {
            "name": "student_id",
            "description": "学生id",
            "type": "number",
            "format": "int32",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/Plan"
              }
            }
          }
        }
      }
    },
    "/PlanApi/getPlanInfo": {
      "get": {
        "tags": [
          "Plan"
        ],
        "summary": "获取规划详情[完成]",
        "parameters": [
          {
            "name": "planinfo_id",
            "description": "规划信息表id",
            "type": "number",
            "format": "int32",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/PlanInfo"
            }
          }
        }
      }
    },
    "/PlanApi/markFinish": {
      "post": {
        "tags": [
          "Plan"
        ],
        "summary": "标记规划完成[完成]",
        "parameters": [
          {
            "name": "planinfo_id",
            "description": "规划信息id",
            "type": "number",
            "format": "int32",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/BaseModel"
            }
          }
        }
      }
    },

    "/NewsApi/listNews":{
      "get": {
        "tags": [
          "News"
        ],
        "summary":"消息列表[完成]",
        "parameters": [
          {
            "name":"app_role",
            "description":"目标端（0-学生端，1-老师端,2-家长端）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          },
          {
            "name":"page",
            "description":"页数",
            "type":"number",
            "format":"int64",
            "in":"query",
            "required":true
          },
          {
            "name":"server_time",
            "description":"服务器时间(服务器返回)",
            "type":"number",
            "format":"int64",
            "in":"query",
            "required":false
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/Push"
              }
            }
          }
        }
      }
    },
    "/NewsApi/newPushDetail":{
      "get": {
        "tags": [
          "News"
        ],
        "summary":"新收到的消息详情[完成]",
        "parameters": [
          {
            "name":"app_role",
            "description":"目标端（0-学生端，1-老师端）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          },
          {
            "name": "push_id",
            "description": "消息id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/Push"
            }
          }
        }
      }
    },
    "/NewsApi/pushDetail":{
      "get": {
        "tags": [
          "News"
        ],
        "summary":"新收到的消息详情(移除session)[完成]",
        "parameters": [
          {
            "name":"app_role",
            "description":"目标端（0-学生端，1-老师端,2-家长端）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          },
          {
            "name": "push_id",
            "description": "消息id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "student_id",
            "description": "学生ID(不为教师端时需要传值)",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "teacher_id",
            "description": "教师ID(教师端时需要传值)",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "parent_id",
            "description": "家长ID(家长端时需要传值)",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/Push"
            }
          }
        }
      }
    }
  },
  "definitions":{
    "BaseModel": {
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32",
          "description": "API返回代号"
        },
        "message": {
          "type": "string",
          "description": "描述信息"
        }
      }
    },
    "Schedule": {
      "description": "日期对应的课程、考试、活动、约谈列表",
      "required": [
        "student_id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": "对应的课程、考试、活动或约谈id"
        },
        "type": {
          "type": "integer",
          "format": "int32",
          "description": "类型,0-课程,1-考试,2-活动,3-约谈"
        },
        "image": {
          "type": "string",
          "description": "课程、考试、活动或约谈图标"
        },
        "name": {
          "type": "string",
          "description": "课程、考试、活动或约谈名称"
        },
        "start_time_txt": {
          "type": "string",
          "description": "课程、考试、活动或约谈开始时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "课程、考试、活动或约谈结束时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "teacher": {
          "type": "string",
          "description": "老师英文名"
        }
      }
    },
    "TeacherSchedule": {
      "description": "日期对应的课程、考试、活动、约谈列表",
      "required": [
        "student_id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": "对应的课程、考试、活动或约谈id"
        },
        "type": {
          "type": "integer",
          "format": "int32",
          "description": "类型,0-课程,1-考试,2-活动,3-约谈"
        },
        "image": {
          "type": "string",
          "description": "课程、考试、活动或约谈图标"
        },
        "name": {
          "type": "string",
          "description": "课程、考试、活动或约谈名称"
        },
        "start_time_txt": {
          "type": "string",
          "description": "课程、考试、活动或约谈开始时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "课程、考试、活动或约谈结束时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "student_number": {
          "type": "integer",
          "format": "int32",
          "description": "学生人数"
        }
      }
    },
    "Course": {
      "description": "课程信息",
      "required": [
        "course_id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": "课程id"
        },
        "image": {
          "type": "string",
          "description": "课程版头图"
        },
        "name": {
          "type": "string",
          "description": "课程名称"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "end_time": {
          "type": "integer",
          "format": "int64",
          "description": "结束时间"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "start_hour": {
          "type": "string",
          "description": "开始小时数"
        },
        "end_hour": {
          "type": "string",
          "description": "结束小时数"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "is_class_over": {
          "type": "integer",
          "format": "int32",
          "description": "是否结束课程(0-未确认，1-已确认)"
        },
        "is_assign_homework": {
          "type": "integer",
          "format": "int32",
          "description": "(是否已布置作业(0-否，1-是))"
        },
        "score": {
          "type": "integer",
          "description": "老师评分"
        },
        "teacher": {
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        },
        "homework": {
          "$ref":"#/definitions/Homework",
          "description": "作业"
        },
        "students": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Student"
          },
          "description": "该课程学生列表,只有教师API才有"
        }
      }
    },
    "Student": {
      "description": "学生",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "name": {
          "type": "string",
          "description": "中文名"
        },
        "english_name":{
          "type": "string",
          "description": "英文名"
        },
        "avatar": {
          "type": "string",
          "description": "用户头像"
        },
        "sex": {
          "type": "integer",
          "format": "int32",
          "description": "性别(0-男 1-女)"
        },
        "phone": {
          "type": "string",
          "description": "手机号"
        },
        "score": {
          "type": "float",
          "format": "float32",
          "description": "本月评分"
        },
        "last_score": {
          "type": "float",
          "format": "float32",
          "description": "上个月评分"
        }
      }
    },
    "Teacher": {
      "description": "老师",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "name": {
          "type": "string",
          "description": "中文名"
        },
        "english_name":{
          "type": "string",
          "description": "英文名"
        },
        "avatar": {
          "type": "string",
          "description": "用户头像"
        },
        "email": {
          "type": "string",
          "description": "邮箱"
        },
        "sex": {
          "type": "integer",
          "format": "int32",
          "description": "性别(0-男 1-女)"
        },
        "teacher_type": {
          "type": "integer",
          "format": "int32",
          "description": "教师类型，0-教师，1-咨询师，2-督导师"
        },
        "introduction": {
          "type": "string",
          "description": "简介"
        }
      }
    },
    "Homework": {
      "description": "作业",
      "properties": {
        "title": {
          "type": "string",
          "description": "标题"
        },
        "summary": {
          "type": "string",
          "description": "概要"
        },
        "content": {
          "type": "string",
          "description": "内容"
        }
      }
    },
    "Examination": {
      "description": " 考试 ",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": "考试id"
        },
        "image": {
          "type": "string",
          "description": "考试图标"
        },
        "name": {
          "type": "string",
          "description": "考试名称"
        },
        "type": {
          "type": "integer",
          "format": "int32",
          "description": "考试类型(0-模拟考试，1-正式考试)"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "score": {
          "type": "integer",
          "format": "int32",
          "description": "分数"
        },
        "detail": {
          "type": "string",
          "description": "评分详情"
        },
        "comment": {
          "type": "string",
          "description": "老师评语"
        },
        "teacher": {
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        }
      }
    },
    "Activity": {
      "description": "活动",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": "活动id"
        },
        "icon": {
          "type": "string",
          "description": "活动图标"
        },
        "image": {
          "type": "string",
          "description": "封面图"
        },
        "name": {
          "type": "string",
          "description": "活动名称"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "content": {
          "type": "string",
          "description": "图文详情"
        }
      }
    },
    "Meeting": {
      "description": "约谈",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "description": " 约谈id"
        },
        "image": {
          "type": "string",
          "description": "封面图"
        },
        "name": {
          "type": "string",
          "description": "约见名称"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "teacher": {
          "type": "string",
          "description": "老师英文名"
        },
        "summary": {
          "type": "string",
          "description": "约谈小结"
        }
      }
    },
    "Push": {
      "description": "推送",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "title": {
          "type": "string",
          "description": "标题"
        },
        "summary": {
          "type": "string",
          "description": "概述"
        },
        "content": {
          "type": "string",
          "description": "系统推送内容"
        },
        "source": {
          "type": "string",
          "description": "消息来源"
        },
        "create_time": {
          "type": "integer",
          "format": "int64",
          "description": "创建时间"
        }
      }
    },
    "Plan": {
      "description": "规划",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "plan_id": {
          "type": "integer",
          "format": "int32",
          "description": "规划表id"
        },
        "title": {
          "type": "string",
          "description": "标题"
        },
        "pid": {
          "type": "integer",
          "format": "int64",
          "description": "父规划id"
        },
        "level": {
          "type": "integer",
          "format": "int32",
          "description": "规划层级，(0-1级，1-2级，2-3级)，最多3级"
        },
        "schedule": {
          "type": "integer",
          "format": "int32",
          "description": "规划进度"
        },
        "finish_time": {
          "type": "string",
          "description": "完成时间的时间戳"
        }
      }
    },
    "PlanInfo": {
      "description": "规划详情",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "plan_id": {
          "type": "integer",
          "format": "int32",
          "description": "规划表id"
        },
        "title": {
          "type": "string",
          "description": "标题"
        },
        "content": {
          "type": "string",
          "description": "规划内容"
        },
        "schedule": {
          "type": "integer",
          "format": "int32",
          "description": "规划进度"
        },
        "is_finished": {
          "type": "integer",
          "format": "int32",
          "description": "0-未完成,1-已完成"
        },
        "finish_time": {
          "type": "string",
          "description": "完成时间的时间戳"
        }
      }
    },
    "CourseDate": {
      "description": "一个月内有课程、考试、、活动、约谈的日期[完成]",
      "properties": {
        "course": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "一个月内有课程的日期的整数数组"
        },
        "exam": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "一个月内有考试的日期的整数数组"
        },
        "activity": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "一个月内有活动的日期的整数数组"
        },
        "meeting": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "一个月内有约谈的日期的整数数组"
        }
      }
    }
  }
}