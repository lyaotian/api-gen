module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "prestige",
    "description": "描述",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Yaotian"
    },
    "license": {
      "name": "MIT"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/api",
  "tags": [
    {
      "name": "Student",
      "description": "学生相关"
    },
    {
      "name": "Teacher",
      "description": "老师相关"
    },
    {
      "name": "News",
      "description": "消息相关"
    },
    {
      "name": "Parents",
      "description": "家长端"
    },
    {
      "name": "Splash",
      "description": "启动图"
    },
    {
      "name": "Plan",
      "description": "学生规划"
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
    "/StudentApi/login": {
      "post": {
        "tags": [
          "Student"
        ],
        "summary": "登录[完成]",
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
            "name": "phone",
            "in": "query",
            "description": "手机号",
            "required": true,
            "type": "string"
          },
          {
            "name": "password",
            "in": "query",
            "description": "密码",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Student"
            }
          }
        }
      }
    },
    "/StudentApi/chooseAvatar": {
      "post": {
        "tags": [
          "Student"
        ],
        "summary": "修改学生头像[完成]",
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
            "name": "avatar",
            "in": "formData",
            "description": "头像",
            "required": true,
            "type": "file"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Student"
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
        "summary": "学生详细信息[完成]",
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
    "/StudentApi/listAdvertise": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "广告列表[完成]",
        "parameters":[
          {
            "name":"app_role",
            "description":"目标端（0-学生端，1-老师端）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/Advertise"
              }
            }
          }
        }
      }
    },
    "/StudentApi/advertiseDetail":{
      "get":{
        "tags":[
          "Student"
        ],
        "summary": "广告详情[完成]",
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
            "name": "advertise_id",
            "description": "广告id",
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
               "$ref":"#/definitions/Advertise"
            }
          }
        }
      }
    },
    "/StudentApi/studentCourseDays": {
      "get": {
        "tags": [
          "Student"
        ],
        "summary": "学生端课程时间列表[完成]",
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
            "name": "month",
            "description": "月份（xxxx-xx）",
            "in": "query",
            "required": true,
            "type": "string",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/CourseTime"
            }
          }
        }
      }
    },
    "/StudentApi/listStudentCourse":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生课程列表[完成]",
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
            "name": "start_time",
            "description": "日历时间",
            "in": "query",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/StudentSchedule"
            }
          }
        }
      }
    },
    "/StudentApi/courseDetail":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生课程详情[完成]",
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
            "name": "course_id",
            "description": "课程id",
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
             "$ref":"#/definitions/Course"
            }
          }
        }
      }
    },

    "/StudentApi/examDetail":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生考试详情[完成]",
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
            "name": "examination_id",
            "description": "考试id",
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
             "$ref":"#/definitions/Examination"
            }
          }
        }
      }
    },

    "/StudentApi/activityDetail":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生活动详情[完成]",
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
            "name": "activity_id",
            "description": "活动id",
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
             "$ref":"#/definitions/Activity"
            }
          }
        }
      }
    },

    "/StudentApi/meetingDetail":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生活动详情[完成]",
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
            "name": "meeting_id",
            "description": "约谈id",
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
             "$ref":"#/definitions/Meeting"
            }
          }
        }
      }
    },

    "/StudentApi/listStudentPlan":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生规划列表[完成]",
        "parameters": [
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
    "/StudentApi/planDetail":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生规划详情[完成]",
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
            "name": "plan_id",
            "description": "规划id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "html"
          }
        }
      }
    },
    "/StudentApi/applyLeave":{
      "post": {
        "tags": [
          "Student"
        ],
        "summary":"请假调课申请[完成]",
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
            "name": "target_id",
            "description": "课程或活动等id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "type",
            "description": "请假或调课（0-请假，1-调课）",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "target_type",
            "description": "类型（1-课程，2-考试,3-活动,4-约谈）",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int32"
          },
          {
            "name": "original_course_msg",
            "description":"原课程信息",
            "in": "query",
            "type": "string"
          },
          {
            "name": "expect_course_msg",
            "description":"期望课程信息",
            "in": "query",
            "type": "string"
          },
          {
            "name": "reason",
            "description":"请假或调课原因",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },

    "/StudentApi/feedback":{
      "post": {
        "tags": [
          "Student"
        ],
        "summary":"学生对平台的反馈[完成]",
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
            "name": "content",
            "description": "反馈内容",
            "in": "query",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },

    "/StudentApi/chargeRecord":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生充值课时记录[完成]",
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
            "name": "type",
            "description": "课时类型(1-小班,2-1对1)",
            "in": "query",
            "required": true,
            "type": "number",
            "format":"int32"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/ChargeRecord"
              }
            }
          }
        }
      }
    },

    "/StudentApi/payRecord":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生课时花费记录[完成]",
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
            "name": "type",
            "description": "课时类型(1-小班,2-1对1)",
            "in": "query",
            "required": true,
            "type": "number",
            "format":"int32"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/PayRecord"
              }
            }
          }
        }
      }
    },

    "/StudentApi/costRecord":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生杂费花费记录[完成]",
        "parameters": [
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/CostRecord"
              }
            }
          }
        }
      }
    },
    "/StudentApi/tuitionRecord":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生杂费记录[完成]",
        "parameters": [
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/CostRecord"
              }
            }
          }
        }
      }
    },

    "/StudentApi/activityContent":{
      "get": {
        "tags": [
          "Student"
        ],
        "summary":"学生活动图文详情[完成]",
        "parameters": [
          {
            "name":"activity_id",
            "description":"活动ID",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          },
          {
            "name":"token",
            "description":"验证token(md5(activity_1))",
            "type":"string",
            "in":"query",
            "required":true
          }
        ],
        "responses": {
          "200": {
            "description": "html"
          }
        }
      }
    },

    "/TeacherApi/login": {
      "post": {
        "tags": [
          "Teacher"
        ],
        "summary": "登录[完成]",
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
            "name": "phone",
            "in": "query",
            "description": "手机号",
            "required": true,
            "type": "string"
          },
          {
            "name": "password",
            "in": "query",
            "description": "密码",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Teacher"
            }
          }
        }
      }
    },
    "/TeacherApi/teacherCourseDays": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "老师端课程时间列表[完成]",
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
            "name": "month",
            "description": "月份（xxxx-xx）",
            "in": "query",
            "required": true,
            "type": "string",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/CourseTime"
            }
          }
        }
      }
    },
    "/TeacherApi/listTeacherCourse":{
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary":"老师课程列表[完成]",
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
            "name": "start_time",
            "description": "日历时间",
            "in": "query",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/definitions/Course"
              }
            }
          }
        }
      }
    },
    "/TeacherApi/listStudents":{
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary":"学生列表[完成]",
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
                "$ref":"#/definitions/Student"
              }
            }
          }
        }
      }
    },
    "/TeacherApi/assignHomework":{
      "post": {
        "tags": [
          "Teacher"
        ],
        "summary":"布置作业[完成]",
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
            "name": "course_id",
            "description": "课程ID(批量布置才需要)",
            "in": "query",
            "required": false,
            "type":"integer",
            "format":"int64"
          },
          {
            "name": "selected_ids",
            "description": "选择学生id,json",
            "in": "query",
            "required": true,
            "type":"string"
          },
          {
            "name": "title",
            "description": "作业标题",
            "in": "query",
            "required": true,
            "type":"string"
          },
          {
            "name": "content",
            "description": "作业内容",
            "in": "query",
            "required": true,
            "type":"string"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/TeacherApi/teacherInfo": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "老师详细信息[完成]",
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
            "name": "teacher_id",
            "description": "老师id",
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
              "$ref":"#/definitions/Teacher"
            }
          }
        }
      }
    },

    "/TeacherApi/classOver": {
      "post": {
        "tags": [
          "Teacher"
        ],
        "summary": "老师确认上课[完成]",
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
            "name": "course_id",
            "description": "课程ID",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "selected_ids",
            "description": "选择学生ID,json",
            "in": "query",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },

    "/TeacherApi/multiHomework": {
      "get": {
        "tags": [
          "Teacher"
        ],
        "summary": "批量作业历史记录[完成]",
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
            "name": "course_id",
            "description": "课程ID",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "返回和单个学生作业历史记录一样"
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
    },

    "/ParentsApi/listAdvertise":{
      "get": {
        "tags": [
          "Parents"
        ],
        "summary":"家长端广告列表[完成]",
        "parameters": [
          {
            "name":"app_role",
            "description":"目标端（0-学生端，1-老师端）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/Advertise"
            }
          }
        }
      }
    },

    "/ParentsApi/changePushState":{
      "get": {
        "tags": [
          "Parents"
        ],
        "summary":"家长端关闭或开启推送[完成]",
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
            "name":"is_access_student",
            "description":"学生消息状态（0-关闭，1-开启）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          },
          {
            "name":"is_access_parent",
            "description":"学生消息状态（0-关闭，1-开启）",
            "type":"number",
            "format":"int32",
            "in":"query",
            "required":true
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },

    "/SplashApi/splash":{
      "get": {
        "tags": [
          "Splash"
        ],
        "summary":"获取启动图[完成]",
        "parameters": [
        ],
        "responses": {
          "200": {
            "description": "",
            "schema":{
              "$ref":"#/definitions/Splash"
            }
          }
        }
      }
    }
    ,
    "/SplashApi/content":{
      "get": {
        "tags": [
          "Splash"
        ],
        "summary":"获取图文详情[完成]",
        "parameters": [
          {
            "name": "id",
            "description": "启动图id",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/PlanApi/newContent":{
      "get": {
        "tags": [
          "Plan"
        ],
        "summary":"新获取图文详情(移除session)[完成]",
        "parameters": [
          {
            "name": "student_id",
            "description": "学生ID",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "type",
            "description": "（0-学术规划，1-升学规划，2-活动规划)",
            "in": "query",
            "required": true,
            "type": "number",
            "format": "int64"
          },
          {
            "name": "token",
            "description": "md5(plan_type)",
            "in": "query",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }

  },
  "definitions": {
    "Student":{
      "description":"学生",
      "required":[
        "id"
      ],
      "properties":{
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "phone": {
          "type": "string",
          "description": "手机号"
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
        "birthday": {
          "type": "integer",
          "format": "int64",
          "description": "出生日期"
        },
        "parent_phone": {
          "type": "string",
          "description": "家长手机号码"
        },
        "parent_email": {
          "type": "string",
          "description": "家长邮箱"
        },
        "school": {
          "type": "string",
          "description": "就读学校名称"
        },
        "grade": {
          "type": "string",
          "description": "所在年级"
        },
        "has_standard_exam": {
          "type": "integer",
          "format": "int32",
          "description": "是否参加过标准化考试(0-否 1-是)"
        },
        "study_course": {
          "type": "string",
          "description": "就读课程"
        },
        "other_course": {
          "type": "string",
          "description": "选课"
        },
        "apply_course": {
          "type": "string",
          "description": "报名学习课程"
        },
        "apply_exam_time": {
          "type": "integer",
          "format": "int32",
          "description": "报名考试时间"
        },
        "history_score": {
          "type": "string",
          "description": "历史考试成绩"
        },
        "imitate_score": {
          "type": "string",
          "description": "模考成绩"
        },
        "diagnostic_score": {
          "type": "string",
          "description": "摸底考试成绩"
        },
        "apply_country": {
          "type": "string",
          "description": "留学意向国家"
        },
        "instead_apply": {
          "type": "integer",
          "format": "int32",
          "description": "是否代报名"
        },
        "is_sign": {
          "type": "integer",
          "format": "int32",
          "description": "是否签约留学"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "is_student": {
          "type": "integer",
          "format": "int32",
          "description": "是否学生账号(0-否,1-是)"
        },
        "is_access_student": {
          "type": "integer",
          "format": "int32",
          "description": "是否接收学生推送(0-否,1-是)家长账号登陆返回"
        },
        "is_access_parent": {
          "type": "integer",
          "format": "int32",
          "description": "是否接收家长推送(0-否,1-是)家长账号登陆返回"
        },
        "push_token": {
          "type": "string",
          "description": "注册极光推送别名"
        },
        "push_tag": {
          "type": "string",
          "description": "注册极光推送标签(字符串数组)"
        },
        "advisory":{
          "$ref":"#/definitions/Advisory",
          "description": "咨询老师,暂时用来注册极光推送"
        }
      }
    },

    "Advertise": {
      "description": "广告",
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
          "description": "广告标题"
        },
        "image": {
          "type": "string",
          "description": "图片"
        },
        "detail": {
          "type": "string",
          "description": "广告详情"
        }
      }
    },
    "StudentSchedule":{
      "description":"学生课程表",
      "required":[
        "id"
      ],
      "properties": {
        "courses":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Course"
          },
          "description":"课程"
        },
        "activities":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Activity"
          },
          "description":"活动"
        },
        "exams":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Examination"
          },
          "description":"考试"
        },
        "meetings":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Meeting"
          },
          "description":"约谈"
        }
      }
    },

    "Course":{
      "description":"课程",
      "required":[
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
          "description": "课程名称"
        },
        "image": {
          "type": "string",
          "description": "课程图片"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "qq": {
          "type": "string",
          "description": "QQ号"
        },
        "type": {
          "type": "integer",
          "format": "int32",
          "description": "课程类型（0.教学课程，1.辅导课程，2.网络课程）"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "teacher":{
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        },
        "students":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Student"
          },
          "description":"上课学生"
        }
        }
      },
    "Examination":{
      "description":"考试",
      "required":[
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
          "description": "考试名称"
        },
        "type": {
          "type": "string",
          "description": "考试类型"
        },
        "image": {
          "type": "string",
          "description": "考试图片"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "qq": {
          "type": "string",
          "description": "QQ号"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "teacher":{
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        },
        "students":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Student"
          },
          "description":"上课学生"
        }
        }
    },

    "Activity":{
      "description":"活动",
      "required":[
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
          "description": "活动名称"
        },
        "image": {
          "type": "string",
          "description": "活动图片"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "qq": {
          "type": "string",
          "description": "QQ号"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "teacher":{
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        },
        "students":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Student"
          },
          "description":"上课学生"
        }
        }
    },

    "Meeting":{
      "description":"约谈",
      "required":[
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
          "description": "约谈名称"
        },
        "image": {
          "type": "string",
          "description": "约谈图片"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "开始时间"
        },
        "classroom": {
          "type": "string",
          "description": "教室"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "qq": {
          "type": "string",
          "description": "QQ号"
        },
        "remark": {
          "type": "string",
          "description": "备注"
        },
        "teacher":{
          "$ref":"#/definitions/Teacher",
          "description": "上课老师"
        },
        "students":{
          "type":"array",
          "items":{
            "$ref":"#/definitions/Student"
          },
          "description":"上课学生"
        }
        }
    },

    "Plan":{
      "description":"规划",
      "required":[
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "type": {
          "type": "integer",
          "format": "int64",
          "description": "类型（0-学术规划，1-升学规划，2-活动规划)"
        },
        "title": {
          "type": "string",
          "description": "规划标题"
        },
        "teacher_name": {
          "type": "string",
          "description": "老师名称"
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
        "introduction": {
          "type": "string",
          "description": "简介"
        }
      }
    },

    "Image": {
      "description": "图片",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "path": {
          "type": "string",
          "description": "图片路径"
        }
      }
    },
    "Push": {
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

    "ChargeRecord": {
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "type": {
          "type": "integer",
          "format": "int64",
          "description": "类型(1-小班,2-1对1)"
        },
        "amount": {
          "type": "number",
          "format": "double",
          "description": "充值数量"
        },
        "total": {
          "type": "number",
          "format": "double",
          "description": "充值之后数量"
        },
        "create_time": {
          "type": "number",
          "format": "int64",
          "description": "创建时间"
        }
      }
    },

    "PayRecord": {
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "course_name": {
          "type": "string",
          "description": "课程名称"
        },
        "start_time": {
          "type": "integer",
          "format": "int64",
          "description": "上课日期"
        },
        "start_time_txt": {
          "type": "string",
          "description": "上课时间"
        },
        "end_time_txt": {
          "type": "string",
          "description": "下课时间"
        },
        "teacher_name": {
          "type": "string",
          "description": "老师名字"
        }
      }
    },

    "CostRecord": {
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        },
        "type": {
          "type": "integer",
          "format": "int64",
          "description": "1-充值，2-扣除"
        },
        "amount": {
          "type": "number",
          "format": "float",
          "description": "充值或扣除数量"
        },
        "total": {
          "type": "number",
          "format": "float",
          "description": "剩余金额"
        },
        "remark": {
          "type": "string",
          "description": "充值或扣除原因"
        }
      }
    },

    "Advisory": {
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "description": "ID"
        }
      }
    },

    "CourseTime": {
      "properties": {
        "course_days": {
          "type": "string",
          "description": "学生课程日期数组"
        },
        "meeting_days": {
          "type": "string",
          "description": "学生约见日期数组"
        },
        "activity_days": {
          "type": "string",
          "description": "学生活动日期数组"
        },
        "exam_days": {
          "type": "string",
          "description": "学生考试日期数组"
        },
        "confirmed": {
          "type": "string",
          "description": "老师端已确认课程数组"
        },
        "unconfirmed": {
          "type": "string",
          "description": "老师端未确认课程数组"
        }
      }
    },

    "Splash": {
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
          "description": "标题"
        },
        "time": {
          "type": "integer",
          "format": "int64",
          "description": "显示时间(秒)"
        },
        "is_jump": {
          "type": "integer",
          "format": "int64",
          "description": "是否允许跳过(0-否，1-是)"
        },
        "jump_type": {
          "type": "integer",
          "format": "int64",
          "description": "跳转类型(0-不跳转，1-URL，2-图文)"
        },
        "url": {
          "type": "string",
          "description": "图片地址"
        },
        "link": {
          "type": "string",
          "description": "网页地址"
        }
      }
    },
    "RspModel": {
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
    }
  }
}
