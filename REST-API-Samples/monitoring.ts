// http://localhost/managementportal/management/jhimetrics
//   GET
// 200 OK
const resp = {
  "jvm": {
    "CodeHeap 'profiled nmethods'": {
      "committed": 44433408,
      "max": 122908672,
      "used": 44354944
    },
    "G1 Old Gen": {
      "committed": 106954752,
      "max": 536870912,
      "used": 80812032
    },
    "CodeHeap 'non-profiled nmethods'": {
      "committed": 16318464,
      "max": 122908672,
      "used": 16303232
    },
    "G1 Survivor Space": {
      "committed": 7340032,
      "max": -1,
      "used": 7340032
    },
    "Compressed Class Space": {
      "committed": 19005440,
      "max": 1073741824,
      "used": 18481088
    },
    "Metaspace": {
      "committed": 144965632,
      "max": -1,
      "used": 143851984
    },
    "G1 Eden Space": {
      "committed": 97517568,
      "max": -1,
      "used": 88080384
    },
    "CodeHeap 'non-nmethods'": {
      "committed": 2555904,
      "max": 5840896,
      "used": 1566336
    }
  },
  "databases": {
    "percentile": {
      "value": 0.00294912
    },
    "min": {
      "value": 10
    },
    "max": {
      "value": 10
    },
    "idle": {
      "value": 9
    },
    "usage": {
      "0.0": 1.96608,
      "1.0": 11.993088,
      "max": 22,
      "totalTime": 10097,
      "mean": 15.04769001490313,
      "0.5": 2.94912,
      "count": 671,
      "0.99": 11.993088,
      "0.75": 5.177344,
      "0.95": 11.993088
    },
    "pending": {
      "value": 0
    },
    "active": {
      "value": 1
    },
    "acquire": {
      "0.0": 0.002432,
      "1.0": 4.980608,
      "max": 4.79325,
      "totalTime": 333.587495,
      "mean": 0.49714976900149027,
      "0.5": 0.0032,
      "count": 671,
      "0.99": 4.980608,
      "0.75": 1.441664,
      "0.95": 4.980608
    },
    "creation": {
      "0.0": 0,
      "1.0": 0,
      "max": 0,
      "totalTime": 1610,
      "mean": 19.876543209876544,
      "0.5": 0,
      "count": 81,
      "0.99": 0,
      "0.75": 0,
      "0.95": 0
    },
    "connections": {
      "value": 10
    }
  },
  "http.server.requests": {
    "all": {
      "count": 234
    },
    "percode": {
      "200": {
        "max": 107.921,
        "mean": 69.61366921004566,
        "count": 219
      },
      "201": {
        "max": 0,
        "mean": 160.61181274999998,
        "count": 8
      },
      "204": {
        "max": 0,
        "mean": 38.301709,
        "count": 1
      },
      "401": {
        "max": 0,
        "mean": 81.2273834,
        "count": 5
      },
      "404": {
        "max": 0,
        "mean": 135.170959,
        "count": 1
      }
    }
  },
  "cache": {
    "org.radarbase.management.domain.SourceType": {
      "cache.entry.memory": 4182,
      "cache.size": 2,
      "cache.puts": 33,
      "cache.gets.hit": 54,
      "cache.partition.gets": 25,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Project.sourceTypes": {
      "cache.entry.memory": 5649,
      "cache.size": 3,
      "cache.puts": 36,
      "cache.gets.hit": 33,
      "cache.partition.gets": 1,
      "cache.entries": 3
    },
    "org.radarbase.management.domain.Subject": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 14,
      "cache.gets.hit": 7,
      "cache.partition.gets": 0,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Subject.metaTokens": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 0,
      "cache.gets.hit": 0,
      "cache.partition.gets": 0,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.User.roles": {
      "cache.entry.memory": 0,
      "cache.size": 3,
      "cache.puts": 47,
      "cache.gets.hit": 288,
      "cache.partition.gets": 270,
      "cache.entries": 3
    },
    "org.radarbase.management.domain.Group": {
      "cache.entry.memory": 0,
      "cache.size": 3,
      "cache.puts": 78,
      "cache.gets.hit": 77,
      "cache.partition.gets": 2,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Source": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 4,
      "cache.gets.hit": 2,
      "cache.partition.gets": 0,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.SourceData": {
      "cache.entry.memory": 4126,
      "cache.size": 2,
      "cache.puts": 29,
      "cache.gets.hit": 33,
      "cache.partition.gets": 8,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.User": {
      "cache.entry.memory": 0,
      "cache.size": 3,
      "cache.puts": 292,
      "cache.gets.hit": 280,
      "cache.partition.gets": 3,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Organization": {
      "cache.entry.memory": 8168,
      "cache.size": 4,
      "cache.puts": 54,
      "cache.gets.hit": 85,
      "cache.partition.gets": 37,
      "cache.entries": 4
    },
    "org.radarbase.management.domain.Project": {
      "cache.entry.memory": 0,
      "cache.size": 3,
      "cache.puts": 71,
      "cache.gets.hit": 73,
      "cache.partition.gets": 6,
      "cache.entries": 3
    },
    "org.radarbase.management.domain.Subject.sources": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 14,
      "cache.gets.hit": 7,
      "cache.partition.gets": 0,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.SourceType.projects": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 0,
      "cache.gets.hit": 0,
      "cache.partition.gets": 2,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.MetaToken": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 0,
      "cache.gets.hit": 0,
      "cache.partition.gets": 0,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Authority": {
      "cache.entry.memory": 0,
      "cache.size": 3,
      "cache.puts": 44,
      "cache.gets.hit": 270,
      "cache.partition.gets": 232,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Role": {
      "cache.entry.memory": 6054,
      "cache.size": 3,
      "cache.puts": 46,
      "cache.gets.hit": 269,
      "cache.partition.gets": 228,
      "cache.entries": 3
    },
    "org.radarbase.management.domain.SourceType.sourceData": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 4,
      "cache.gets.hit": 16,
      "cache.partition.gets": 18,
      "cache.entries": 0
    },
    "org.radarbase.management.domain.Role.users": {
      "cache.entry.memory": 0,
      "cache.size": 0,
      "cache.puts": 0,
      "cache.gets.hit": 0,
      "cache.partition.gets": 0,
      "cache.entries": 0
    }
  },
  "garbageCollector": {
    "jvm.gc.max.data.size": 536870912,
    "jvm.gc.pause": {
      "0.0": 0,
      "1.0": 0,
      "max": 0,
      "totalTime": 16,
      "mean": 8,
      "0.5": 0,
      "count": 2,
      "0.99": 0,
      "0.75": 0,
      "0.95": 0
    },
    "jvm.gc.memory.promoted": 59144192,
    "jvm.gc.memory.allocated": 5742002168,
    "classesLoaded": 28511,
    "jvm.gc.live.data.size": 0,
    "jvm.gc.overhead": 0,
    "classesUnloaded": 0
  },
  "services": {
    "/api/authorities": {
      "GET": {
        "max": 59.771834,
        "mean": 29.885917,
        "count": 2
      }
    },
    "/api/projects/{projectName:^[_'.@A-Za-z0-9- ]*$}/subjects": {
      "GET": {
        "max": 244.698291,
        "mean": 122.3491455,
        "count": 2
      }
    },
    "/api/source-data": {
      "POST": {
        "max": 84.773583,
        "mean": 84.773583,
        "count": 1
      },
      "GET": {
        "max": 631.405543,
        "mean": 57.40050390909091,
        "count": 11
      },
      "PUT": {
        "max": 115.278042,
        "mean": 115.278042,
        "count": 1
      }
    },
    "/api/source-types": {
      "POST": {
        "max": 123.023625,
        "mean": 123.023625,
        "count": 1
      },
      "GET": {
        "max": 590.280335,
        "mean": 84.32576214285714,
        "count": 7
      },
      "PUT": {
        "max": 104.763541,
        "mean": 104.763541,
        "count": 1
      }
    },
    "/api/source-types/{producer:^[_'.@A-Za-z0-9- ]*$}/{model:^[_'.@A-Za-z0-9- ]*$}/{version:^[_'.@A-Za-z0-9- ]*$}": {
      "DELETE": {
        "max": 113.861958,
        "mean": 113.861958,
        "count": 1
      }
    },
    "/api/users/{login:^[_'.@A-Za-z0-9- ]*$}": {
      "DELETE": {
        "max": 59.49075,
        "mean": 59.49075,
        "count": 1
      },
      "GET": {
        "max": 306.213376,
        "mean": 110.34608374999999,
        "count": 4
      }
    },
    "/api/oauth-clients/{id:^[_'.@A-Za-z0-9- ]*$}": {
      "DELETE": {
        "max": 24.16775,
        "mean": 24.16775,
        "count": 1
      },
      "GET": {
        "max": 316.154708,
        "mean": 79.038677,
        "count": 4
      }
    },
    "/api/oauth-clients": {
      "POST": {
        "max": 179.920584,
        "mean": 179.920584,
        "count": 1
      },
      "GET": {
        "max": 331.231542,
        "mean": 47.318791714285716,
        "count": 7
      },
      "PUT": {
        "max": 198.973792,
        "mean": 99.486896,
        "count": 2
      }
    },
    "/api/projects": {
      "POST": {
        "max": 120.536334,
        "mean": 120.536334,
        "count": 1
      },
      "GET": {
        "max": 1253.002751,
        "mean": 113.909341,
        "count": 11
      },
      "PUT": {
        "max": 196.005916,
        "mean": 196.005916,
        "count": 1
      }
    },
    "/api/account/reset-activation/init": {
      "POST": {
        "max": 38.301709,
        "mean": 38.301709,
        "count": 1
      }
    },
    "/api/account": {
      "GET": {
        "max": 1891.692625,
        "mean": 85.9860284090909,
        "count": 22
      }
    },
    "/api/projects/{projectName:^[_'.@A-Za-z0-9- ]*$}/groups": {
      "GET": {
        "max": 167.154417,
        "mean": 83.5772085,
        "count": 2
      }
    },
    "/oauth/token": {
      "POST": {
        "max": 1089.473876,
        "mean": 217.8947752,
        "count": 5
      }
    },
    "/**": {
      "GET": {
        "max": 2878.516049,
        "mean": 43.61387953030303,
        "count": 66
      }
    },
    "/api/profile-info": {
      "GET": {
        "max": 178.987124,
        "mean": 25.569589142857144,
        "count": 7
      }
    },
    "/api/login": {
      "POST": {
        "max": 514.025959,
        "mean": 128.50648975,
        "count": 4
      }
    },
    "/api/users": {
      "POST": {
        "max": 542.981584,
        "mean": 180.99386133333334,
        "count": 3
      },
      "GET": {
        "max": 1239.378086,
        "mean": 68.8543381111111,
        "count": 18
      },
      "PUT": {
        "max": 251.375083,
        "mean": 83.79169433333333,
        "count": 3
      }
    },
    "/api/sitesettings": {
      "GET": {
        "max": 77.047499,
        "mean": 38.5237495,
        "count": 2
      }
    },
    "root": {
      "GET": {
        "max": 350.042876,
        "mean": 87.510719,
        "count": 4
      },
      "PUT": {
        "max": 56.094041,
        "mean": 56.094041,
        "count": 1
      }
    },
    "/api/organizations": {
      "POST": {
        "max": 233.658792,
        "mean": 233.658792,
        "count": 1
      },
      "GET": {
        "max": 1267.457126,
        "mean": 115.22337509090909,
        "count": 11
      },
      "PUT": {
        "max": 127.350834,
        "mean": 127.350834,
        "count": 1
      }
    },
    "/api/source-data/{sourceDataName:^[_'.@A-Za-z0-9- ]*$}": {
      "DELETE": {
        "max": 52.374625,
        "mean": 52.374625,
        "count": 1
      },
      "GET": {
        "max": 259.944001,
        "mean": 86.64800033333334,
        "count": 3
      }
    },
    "/oauth/token_key": {
      "GET": {
        "max": 705.316124,
        "mean": 37.121901263157895,
        "count": 19
      }
    }
  },
  "processMetrics": {
    "system.load.average.1m": 2.8193359375,
    "system.cpu.usage": 0.02683162438859621,
    "process.start.time": 1785824929266,
    "system.cpu.count": 8,
    "process.files.open": 69,
    "process.cpu.usage": 0.01630291874835656,
    "process.uptime": 15717896,
    "process.files.max": 1048576
  }
}
// http://localhost/managementportal/management/threaddump
//   GET
// 200 OK
const threaddump_resp = {
  "threads": [
    {
      "threadName": "Reference Handler",
      "threadId": 2,
      "blockedTime": -1,
      "blockedCount": 6,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 10,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "waitForReferencePendingList",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.ref.Reference",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "processPendingReferences",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.Reference",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.Reference$ReferenceHandler",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "Finalizer",
      "threadId": 3,
      "blockedTime": -1,
      "blockedCount": 5,
      "waitedTime": -1,
      "waitedCount": 6,
      "lockName": "java.lang.ref.ReferenceQueue$Lock@642d2a1f",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 8,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.Object",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "remove",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.ReferenceQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "remove",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.ReferenceQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.Finalizer$FinalizerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.lang.ref.ReferenceQueue$Lock",
        "identityHashCode": 1680681503
      }
    },
    {
      "threadName": "Signal Dispatcher",
      "threadId": 4,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 9,
      "stackTrace": [],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "Common-Cleaner",
      "threadId": 12,
      "blockedTime": -1,
      "blockedCount": 122,
      "waitedTime": -1,
      "waitedCount": 337,
      "lockName": "java.lang.ref.ReferenceQueue$Lock@6a1e9ed0",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 8,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.Object",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "remove",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.ReferenceQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.ref.CleanerImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.misc.InnocuousThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.lang.ref.ReferenceQueue$Lock",
        "identityHashCode": 1780391632
      }
    },
    {
      "threadName": "Notification Thread",
      "threadId": 13,
      "blockedTime": -1,
      "blockedCount": 1,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 9,
      "stackTrace": [],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "PostgreSQL-JDBC-Cleaner",
      "threadId": 18,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 524,
      "lockName": "java.lang.ref.ReferenceQueue$Lock@70908d82",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.Object",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "remove",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.ref.ReferenceQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "LazyCleaner.java",
          "lineNumber": 128,
          "className": "org.postgresql.util.LazyCleaner$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.lang.ref.ReferenceQueue$Lock",
        "identityHashCode": 1888521602
      }
    },
    {
      "threadName": "managementportal housekeeper",
      "threadId": 19,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 599,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@4a0bb84d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1242282061
      }
    },
    {
      "threadName": "hz.ManagementPortal.scheduled.thread-",
      "threadId": 22,
      "blockedTime": -1,
      "blockedCount": 1,
      "waitedTime": -1,
      "waitedCount": 274451,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@47fb1ec1",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1207639745
      }
    },
    {
      "threadName": "hz.ManagementPortal.event-1",
      "threadId": 39,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 9,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@598df0f0",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "StripedExecutor.java",
          "lineNumber": 227,
          "className": "com.hazelcast.internal.util.executor.StripedExecutor$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1502474480
      }
    },
    {
      "threadName": "hz.ManagementPortal.event-2",
      "threadId": 40,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 15,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@2d859ade",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "StripedExecutor.java",
          "lineNumber": 227,
          "className": "com.hazelcast.internal.util.executor.StripedExecutor$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 763730654
      }
    },
    {
      "threadName": "hz.ManagementPortal.event-3",
      "threadId": 41,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 10,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@3a5b96f3",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "StripedExecutor.java",
          "lineNumber": 227,
          "className": "com.hazelcast.internal.util.executor.StripedExecutor$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 979080947
      }
    },
    {
      "threadName": "hz.ManagementPortal.event-4",
      "threadId": 42,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 7,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@25499a6f",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "StripedExecutor.java",
          "lineNumber": 227,
          "className": "com.hazelcast.internal.util.executor.StripedExecutor$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 625580655
      }
    },
    {
      "threadName": "hz.ManagementPortal.event-5",
      "threadId": 43,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 13,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@1375f446",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "StripedExecutor.java",
          "lineNumber": 227,
          "className": "com.hazelcast.internal.util.executor.StripedExecutor$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 326497350
      }
    },
    {
      "threadName": "hz.ManagementPortal.operation-parker",
      "threadId": 44,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 15677,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@12a7df9c",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.DelayQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRun",
          "fileName": "OperationParkerImpl.java",
          "lineNumber": 228,
          "className": "com.hazelcast.spi.impl.operationparker.impl.OperationParkerImpl$ExpirationTask",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "OperationParkerImpl.java",
          "lineNumber": 211,
          "className": "com.hazelcast.spi.impl.operationparker.impl.OperationParkerImpl$ExpirationTask",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "call",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.Executors$RunnableAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.FutureTask",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [
        {
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "identityHashCode": 441652258
        }
      ],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 312991644
      }
    },
    {
      "threadName": "hz.ManagementPortal.MetricsRegistry.thread-1",
      "threadId": 47,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 31647,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@742d3f35",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1949122357
      }
    },
    {
      "threadName": "hz.ManagementPortal.MetricsRegistry.thread-2",
      "threadId": 48,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 31675,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@742d3f35",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1949122357
      }
    },
    {
      "threadName": "hz.ManagementPortal.migration",
      "threadId": 46,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 15656,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@1d5e493d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "poll",
          "fileName": "MigrationQueue.java",
          "lineNumber": 48,
          "className": "com.hazelcast.internal.partition.impl.MigrationQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRun",
          "fileName": "MigrationThread.java",
          "lineNumber": 91,
          "className": "com.hazelcast.internal.partition.impl.MigrationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "MigrationThread.java",
          "lineNumber": 66,
          "className": "com.hazelcast.internal.partition.impl.MigrationThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 492718397
      }
    },
    {
      "threadName": "hz.ManagementPortal.InvocationMonitorThread",
      "threadId": 52,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 16624,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@21b54914",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 565528852
      }
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-0",
      "threadId": 25,
      "blockedTime": -1,
      "blockedCount": 53,
      "waitedTime": -1,
      "waitedCount": 16187,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-1",
      "threadId": 26,
      "blockedTime": -1,
      "blockedCount": 64,
      "waitedTime": -1,
      "waitedCount": 17564,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-2",
      "threadId": 27,
      "blockedTime": -1,
      "blockedCount": 59,
      "waitedTime": -1,
      "waitedCount": 17855,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-3",
      "threadId": 28,
      "blockedTime": -1,
      "blockedCount": 66,
      "waitedTime": -1,
      "waitedCount": 15858,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-4",
      "threadId": 29,
      "blockedTime": -1,
      "blockedCount": 50,
      "waitedTime": -1,
      "waitedCount": 17268,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-5",
      "threadId": 30,
      "blockedTime": -1,
      "blockedCount": 52,
      "waitedTime": -1,
      "waitedCount": 17435,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-6",
      "threadId": 31,
      "blockedTime": -1,
      "blockedCount": 61,
      "waitedTime": -1,
      "waitedCount": 16215,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.partition-operation.thread-7",
      "threadId": 32,
      "blockedTime": -1,
      "blockedCount": 66,
      "waitedTime": -1,
      "waitedCount": 15818,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.priority-generic-operation.thread-0",
      "threadId": 33,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 129,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@dc23981",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 76,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 230832513
      }
    },
    {
      "threadName": "hz.ManagementPortal.generic-operation.thread-0",
      "threadId": 34,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 33,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@100b6b9b",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 269183899
      }
    },
    {
      "threadName": "hz.ManagementPortal.generic-operation.thread-1",
      "threadId": 35,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 33,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@100b6b9b",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 269183899
      }
    },
    {
      "threadName": "hz.ManagementPortal.generic-operation.thread-2",
      "threadId": 36,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 33,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@100b6b9b",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 269183899
      }
    },
    {
      "threadName": "hz.ManagementPortal.generic-operation.thread-3",
      "threadId": 37,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 33,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@100b6b9b",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "OperationQueueImpl.java",
          "lineNumber": 85,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationQueueImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "OperationThread.java",
          "lineNumber": 118,
          "className": "com.hazelcast.spi.impl.operationexecutor.impl.OperationThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 269183899
      }
    },
    {
      "threadName": "hz.ManagementPortal.response-0",
      "threadId": 23,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 66,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRun",
          "fileName": "InboundResponseHandlerSupplier.java",
          "lineNumber": 295,
          "className": "com.hazelcast.spi.impl.operationservice.impl.InboundResponseHandlerSupplier$ResponseThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "InboundResponseHandlerSupplier.java",
          "lineNumber": 284,
          "className": "com.hazelcast.spi.impl.operationservice.impl.InboundResponseHandlerSupplier$ResponseThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.response-1",
      "threadId": 24,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 65,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "takeAll",
          "fileName": "MPSCQueue.java",
          "lineNumber": 229,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "take",
          "fileName": "MPSCQueue.java",
          "lineNumber": 151,
          "className": "com.hazelcast.internal.util.concurrent.MPSCQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRun",
          "fileName": "InboundResponseHandlerSupplier.java",
          "lineNumber": 295,
          "className": "com.hazelcast.spi.impl.operationservice.impl.InboundResponseHandlerSupplier$ResponseThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "InboundResponseHandlerSupplier.java",
          "lineNumber": 284,
          "className": "com.hazelcast.spi.impl.operationservice.impl.InboundResponseHandlerSupplier$ResponseThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.SlowOperationDetectorThread",
      "threadId": 38,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 15657,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.Thread",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.TimeUnit",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "sleepInterval",
          "fileName": "SlowOperationDetector.java",
          "lineNumber": 289,
          "className": "com.hazelcast.spi.impl.operationexecutor.slowoperationdetector.SlowOperationDetector$DetectorThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "SlowOperationDetector.java",
          "lineNumber": 154,
          "className": "com.hazelcast.spi.impl.operationexecutor.slowoperationdetector.SlowOperationDetector$DetectorThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-in-0",
      "threadId": 53,
      "blockedTime": -1,
      "blockedCount": 15,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 2138296070,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1954923541,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-in-1",
      "threadId": 54,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 1746396469,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 596315167,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-in-2",
      "threadId": 55,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 1122102423,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 413023666,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-out-0",
      "threadId": 56,
      "blockedTime": -1,
      "blockedCount": 8,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 1333218777,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 879184860,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-out-1",
      "threadId": 57,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 2033163411,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 280321449,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-out-2",
      "threadId": 58,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "selectLoop",
          "fileName": "NioThread.java",
          "lineNumber": 292,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "NioThread.java",
          "lineNumber": 249,
          "className": "com.hazelcast.internal.networking.nio.NioThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "com.hazelcast.internal.networking.nio.SelectorOptimizer$SelectionKeysSet",
          "identityHashCode": 1708770275,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1810783535,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.IO.BalancerThread",
      "threadId": 59,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 786,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@6ea09fc5",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "IOBalancerThread.java",
          "lineNumber": 65,
          "className": "com.hazelcast.internal.networking.nio.iobalancer.IOBalancerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1856020421
      }
    },
    {
      "threadName": "hz.ManagementPortal.IO.thread-Acceptor",
      "threadId": 60,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "acceptLoop",
          "fileName": "TcpServerAcceptor.java",
          "lineNumber": 186,
          "className": "com.hazelcast.internal.server.tcp.TcpServerAcceptor$AcceptorIOThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "TcpServerAcceptor.java",
          "lineNumber": 172,
          "className": "com.hazelcast.internal.server.tcp.TcpServerAcceptor$AcceptorIOThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 1413664685,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 2133841949,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.MulticastThread",
      "threadId": 61,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.Net",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelChImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "trustedBlockingReceive",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.DatagramChannelImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "blockingReceive",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.DatagramChannelImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "receive",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.DatagramSocketAdaptor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "receive",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.net.DatagramSocket",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "receive",
          "fileName": "MulticastService.java",
          "lineNumber": 247,
          "className": "com.hazelcast.internal.cluster.impl.MulticastService",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "MulticastService.java",
          "lineNumber": 223,
          "className": "com.hazelcast.internal.cluster.impl.MulticastService",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [
        {
          "className": "java.util.concurrent.locks.ReentrantLock$NonfairSync",
          "identityHashCode": 1714546162
        }
      ],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.HealthMonitor",
      "threadId": 45,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 785,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -2,
          "className": "java.lang.Thread",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "sleep",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.TimeUnit",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HealthMonitor.java",
          "lineNumber": 163,
          "className": "com.hazelcast.internal.diagnostics.HealthMonitor$HealthMonitorThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "Hazelcast-Hibernate.PhoneHomeService",
      "threadId": 65,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 1280220,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@c851046",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 210047046
      }
    },
    {
      "threadName": "XNIO-1 I/O-1",
      "threadId": 70,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 2,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 1324911068,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1335254830,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-2",
      "threadId": 71,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 7,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 563,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 652291419,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 46276321,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-3",
      "threadId": 72,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 150917388,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1978437650,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-4",
      "threadId": 73,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 563,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 1523113985,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1215289519,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-5",
      "threadId": 74,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 9,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 921114143,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 664431825,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-6",
      "threadId": 75,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 4,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 986667211,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 206787997,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-7",
      "threadId": 76,
      "blockedTime": -1,
      "blockedCount": 3,
      "waitedTime": -1,
      "waitedCount": 4,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 42659302,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 1979901314,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 I/O-8",
      "threadId": 77,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 2,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 910946953,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 539141728,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 Accept",
      "threadId": 78,
      "blockedTime": -1,
      "blockedCount": 1,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": true,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "wait",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.nio.ch.EPoll",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "doSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.EPollSelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "lockAndDoSelect",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "select",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.nio.ch.SelectorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "WorkerThread.java",
          "lineNumber": 544,
          "className": "org.xnio.nio.WorkerThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [
        {
          "className": "sun.nio.ch.Util$2",
          "identityHashCode": 1964153439,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        },
        {
          "className": "sun.nio.ch.EPollSelectorImpl",
          "identityHashCode": 350052234,
          "lockedStackFrame": {
            "classLoaderName": null,
            "moduleName": "java.base",
            "moduleVersion": "17.0.16",
            "methodName": "lockAndDoSelect",
            "fileName": null,
            "lineNumber": -1,
            "className": "sun.nio.ch.SelectorImpl",
            "nativeMethod": false
          },
          "lockedStackDepth": 2
        }
      ],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "scheduling-1",
      "threadId": 79,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 1,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@7deb3822",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "awaitNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 2112567330
      }
    },
    {
      "threadName": "DestroyJavaVM",
      "threadId": 80,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 0,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 task-1",
      "threadId": 87,
      "blockedTime": -1,
      "blockedCount": 56,
      "waitedTime": -1,
      "waitedCount": 1009,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "advance",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ConcurrentHashMap$Traverser",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "next",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ConcurrentHashMap$ValueIterator",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "toArray",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ConcurrentHashMap$CollectionView",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "<init>",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.ArrayList",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "getMeters",
          "fileName": "MeterRegistry.java",
          "lineNumber": 371,
          "className": "io.micrometer.core.instrument.MeterRegistry",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "meterStream",
          "fileName": "Search.java",
          "lineNumber": 267,
          "className": "io.micrometer.core.instrument.search.Search",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "findAll",
          "fileName": "Search.java",
          "lineNumber": 331,
          "className": "io.micrometer.core.instrument.search.Search",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "gauges",
          "fileName": "Search.java",
          "lineNumber": 285,
          "className": "io.micrometer.core.instrument.search.Search",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "jvmMemoryMetrics",
          "fileName": "JHipsterMetricsEndpoint.java",
          "lineNumber": 219,
          "className": "tech.jhipster.config.metric.JHipsterMetricsEndpoint",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "allMetrics",
          "fileName": "JHipsterMetricsEndpoint.java",
          "lineNumber": 51,
          "className": "tech.jhipster.config.metric.JHipsterMetricsEndpoint",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke0",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.DelegatingMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.reflect.Method",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeMethod",
          "fileName": "ReflectionUtils.java",
          "lineNumber": 282,
          "className": "org.springframework.util.ReflectionUtils",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "ReflectiveOperationInvoker.java",
          "lineNumber": 74,
          "className": "org.springframework.boot.actuate.endpoint.invoke.reflect.ReflectiveOperationInvoker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "AbstractDiscoveredOperation.java",
          "lineNumber": 60,
          "className": "org.springframework.boot.actuate.endpoint.annotation.AbstractDiscoveredOperation",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractWebMvcEndpointHandlerMapping.java",
          "lineNumber": 357,
          "className": "org.springframework.boot.actuate.endpoint.web.servlet.AbstractWebMvcEndpointHandlerMapping$ServletWebOperationAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractWebMvcEndpointHandlerMapping.java",
          "lineNumber": 464,
          "className": "org.springframework.boot.actuate.endpoint.web.servlet.AbstractWebMvcEndpointHandlerMapping$OperationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke0",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.DelegatingMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.reflect.Method",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doInvoke",
          "fileName": "InvocableHandlerMethod.java",
          "lineNumber": 205,
          "className": "org.springframework.web.method.support.InvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeForRequest",
          "fileName": "InvocableHandlerMethod.java",
          "lineNumber": 150,
          "className": "org.springframework.web.method.support.InvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeAndHandle",
          "fileName": "ServletInvocableHandlerMethod.java",
          "lineNumber": 117,
          "className": "org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeHandlerMethod",
          "fileName": "RequestMappingHandlerAdapter.java",
          "lineNumber": 895,
          "className": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleInternal",
          "fileName": "RequestMappingHandlerAdapter.java",
          "lineNumber": 808,
          "className": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractHandlerMethodAdapter.java",
          "lineNumber": 87,
          "className": "org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doDispatch",
          "fileName": "DispatcherServlet.java",
          "lineNumber": 1072,
          "className": "org.springframework.web.servlet.DispatcherServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doService",
          "fileName": "DispatcherServlet.java",
          "lineNumber": 965,
          "className": "org.springframework.web.servlet.DispatcherServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "processRequest",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 1006,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doGet",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 898,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "HttpServlet.java",
          "lineNumber": 503,
          "className": "javax.servlet.http.HttpServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 883,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "HttpServlet.java",
          "lineNumber": 590,
          "className": "javax.servlet.http.HttpServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletHandler.java",
          "lineNumber": 74,
          "className": "io.undertow.servlet.handlers.ServletHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 129,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "JwtAuthenticationFilter.kt",
          "lineNumber": 95,
          "className": "org.radarbase.management.security.JwtAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 337,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "FilterSecurityInterceptor.java",
          "lineNumber": 115,
          "className": "org.springframework.security.web.access.intercept.FilterSecurityInterceptor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterSecurityInterceptor.java",
          "lineNumber": 81,
          "className": "org.springframework.security.web.access.intercept.FilterSecurityInterceptor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ExceptionTranslationFilter.java",
          "lineNumber": 122,
          "className": "org.springframework.security.web.access.ExceptionTranslationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ExceptionTranslationFilter.java",
          "lineNumber": 116,
          "className": "org.springframework.security.web.access.ExceptionTranslationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SessionManagementFilter.java",
          "lineNumber": 126,
          "className": "org.springframework.security.web.session.SessionManagementFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SessionManagementFilter.java",
          "lineNumber": 81,
          "className": "org.springframework.security.web.session.SessionManagementFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "AnonymousAuthenticationFilter.java",
          "lineNumber": 109,
          "className": "org.springframework.security.web.authentication.AnonymousAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextHolderAwareRequestFilter.java",
          "lineNumber": 149,
          "className": "org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "RequestCacheAwareFilter.java",
          "lineNumber": 63,
          "className": "org.springframework.security.web.savedrequest.RequestCacheAwareFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "JwtAuthenticationFilter.kt",
          "lineNumber": 95,
          "className": "org.radarbase.management.security.JwtAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OAuth2AuthenticationProcessingFilter.java",
          "lineNumber": 182,
          "className": "org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationProcessingFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "LogoutFilter.java",
          "lineNumber": 103,
          "className": "org.springframework.security.web.authentication.logout.LogoutFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "LogoutFilter.java",
          "lineNumber": 89,
          "className": "org.springframework.security.web.authentication.logout.LogoutFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doHeadersAfter",
          "fileName": "HeaderWriterFilter.java",
          "lineNumber": 90,
          "className": "org.springframework.security.web.header.HeaderWriterFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "HeaderWriterFilter.java",
          "lineNumber": 75,
          "className": "org.springframework.security.web.header.HeaderWriterFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextPersistenceFilter.java",
          "lineNumber": 112,
          "className": "org.springframework.security.web.context.SecurityContextPersistenceFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextPersistenceFilter.java",
          "lineNumber": 82,
          "className": "org.springframework.security.web.context.SecurityContextPersistenceFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "WebAsyncManagerIntegrationFilter.java",
          "lineNumber": 55,
          "className": "org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "ForceEagerSessionCreationFilter.java",
          "lineNumber": 45,
          "className": "org.springframework.security.web.session.ForceEagerSessionCreationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "ForceEagerSessionCreationFilter.java",
          "lineNumber": 45,
          "className": "org.springframework.security.web.session.ForceEagerSessionCreationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "DisableEncodeUrlFilter.java",
          "lineNumber": 42,
          "className": "org.springframework.security.web.session.DisableEncodeUrlFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 221,
          "className": "org.springframework.security.web.FilterChainProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 186,
          "className": "org.springframework.security.web.FilterChainProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeDelegate",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 354,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 267,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "RequestContextFilter.java",
          "lineNumber": 100,
          "className": "org.springframework.web.filter.RequestContextFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "FormContentFilter.java",
          "lineNumber": 93,
          "className": "org.springframework.web.filter.FormContentFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "SessionRepositoryFilter.java",
          "lineNumber": 142,
          "className": "org.springframework.session.web.http.SessionRepositoryFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 82,
          "className": "org.springframework.session.web.http.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeDelegate",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 354,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 267,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "WebMvcMetricsFilter.java",
          "lineNumber": 96,
          "className": "org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "CharacterEncodingFilter.java",
          "lineNumber": 201,
          "className": "org.springframework.web.filter.CharacterEncodingFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "FilterHandler.java",
          "lineNumber": 84,
          "className": "io.undertow.servlet.handlers.FilterHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletSecurityRoleHandler.java",
          "lineNumber": 62,
          "className": "io.undertow.servlet.handlers.security.ServletSecurityRoleHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletChain.java",
          "lineNumber": 68,
          "className": "io.undertow.servlet.handlers.ServletChain$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletDispatchingHandler.java",
          "lineNumber": 36,
          "className": "io.undertow.servlet.handlers.ServletDispatchingHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "RedirectDirHandler.java",
          "lineNumber": 68,
          "className": "io.undertow.servlet.handlers.RedirectDirHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "SSLInformationAssociationHandler.java",
          "lineNumber": 117,
          "className": "io.undertow.servlet.handlers.security.SSLInformationAssociationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletAuthenticationCallHandler.java",
          "lineNumber": 57,
          "className": "io.undertow.servlet.handlers.security.ServletAuthenticationCallHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AbstractConfidentialityHandler.java",
          "lineNumber": 46,
          "className": "io.undertow.security.handlers.AbstractConfidentialityHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletConfidentialityConstraintHandler.java",
          "lineNumber": 64,
          "className": "io.undertow.servlet.handlers.security.ServletConfidentialityConstraintHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AuthenticationMechanismsHandler.java",
          "lineNumber": 60,
          "className": "io.undertow.security.handlers.AuthenticationMechanismsHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "CachedAuthenticatedSessionHandler.java",
          "lineNumber": 77,
          "className": "io.undertow.servlet.handlers.security.CachedAuthenticatedSessionHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AbstractSecurityContextAssociationHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.security.handlers.AbstractSecurityContextAssociationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "SendErrorPageHandler.java",
          "lineNumber": 52,
          "className": "io.undertow.servlet.handlers.SendErrorPageHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleFirstRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 275,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "access$100",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 79,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 134,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$2",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$2",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletRequestContextThreadSetupAction.java",
          "lineNumber": 48,
          "className": "io.undertow.servlet.core.ServletRequestContextThreadSetupAction$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ContextClassLoaderSetupAction.java",
          "lineNumber": 43,
          "className": "io.undertow.servlet.core.ContextClassLoaderSetupAction$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "dispatchRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 255,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "access$000",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 79,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 100,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRootHandler",
          "fileName": "Connectors.java",
          "lineNumber": 395,
          "className": "io.undertow.server.Connectors",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HttpServerExchange.java",
          "lineNumber": 852,
          "className": "io.undertow.server.HttpServerExchange$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "ContextClassLoaderSavingRunnable.java",
          "lineNumber": 35,
          "className": "org.jboss.threads.ContextClassLoaderSavingRunnable",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "safeRun",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2019,
          "className": "org.jboss.threads.EnhancedQueueExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRunTask",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1558,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1449,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 task-2",
      "threadId": 96,
      "blockedTime": -1,
      "blockedCount": 20,
      "waitedTime": -1,
      "waitedCount": 377,
      "lockName": "org.jboss.threads.EnhancedQueueExecutor@48cf9059",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2194,
          "className": "org.jboss.threads.EnhancedQueueExecutor$PoolThreadNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1481,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "org.jboss.threads.EnhancedQueueExecutor",
        "identityHashCode": 1221562457
      }
    },
    {
      "threadName": "DefaultDispatcher-worker-1",
      "threadId": 166,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 1175,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-8",
      "threadId": 186,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 1711,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-4",
      "threadId": 190,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 1669,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-2",
      "threadId": 192,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 1678,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-7",
      "threadId": 194,
      "blockedTime": -1,
      "blockedCount": 4,
      "waitedTime": -1,
      "waitedCount": 1688,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 task-4",
      "threadId": 291,
      "blockedTime": -1,
      "blockedCount": 26,
      "waitedTime": -1,
      "waitedCount": 1011,
      "lockName": "org.jboss.threads.EnhancedQueueExecutor@48cf9059",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2194,
          "className": "org.jboss.threads.EnhancedQueueExecutor$PoolThreadNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1481,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "org.jboss.threads.EnhancedQueueExecutor",
        "identityHashCode": 1221562457
      }
    },
    {
      "threadName": "XNIO-1 task-3",
      "threadId": 292,
      "blockedTime": -1,
      "blockedCount": 14,
      "waitedTime": -1,
      "waitedCount": 181,
      "lockName": "org.jboss.threads.EnhancedQueueExecutor@48cf9059",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2194,
          "className": "org.jboss.threads.EnhancedQueueExecutor$PoolThreadNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1481,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "org.jboss.threads.EnhancedQueueExecutor",
        "identityHashCode": 1221562457
      }
    },
    {
      "threadName": "XNIO-1 task-5",
      "threadId": 293,
      "blockedTime": -1,
      "blockedCount": 50,
      "waitedTime": -1,
      "waitedCount": 303,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "RUNNABLE",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.management",
          "moduleVersion": "17.0.16",
          "methodName": "dumpThreads0",
          "fileName": null,
          "lineNumber": -2,
          "className": "sun.management.ThreadImpl",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.management",
          "moduleVersion": "17.0.16",
          "methodName": "dumpAllThreads",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.management.ThreadImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.management",
          "moduleVersion": "17.0.16",
          "methodName": "dumpAllThreads",
          "fileName": null,
          "lineNumber": -1,
          "className": "sun.management.ThreadImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "getFormattedThreadDump",
          "fileName": "ThreadDumpEndpoint.java",
          "lineNumber": 51,
          "className": "org.springframework.boot.actuate.management.ThreadDumpEndpoint",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "threadDump",
          "fileName": "ThreadDumpEndpoint.java",
          "lineNumber": 42,
          "className": "org.springframework.boot.actuate.management.ThreadDumpEndpoint",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke0",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.DelegatingMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.reflect.Method",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeMethod",
          "fileName": "ReflectionUtils.java",
          "lineNumber": 282,
          "className": "org.springframework.util.ReflectionUtils",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "ReflectiveOperationInvoker.java",
          "lineNumber": 74,
          "className": "org.springframework.boot.actuate.endpoint.invoke.reflect.ReflectiveOperationInvoker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "AbstractDiscoveredOperation.java",
          "lineNumber": 60,
          "className": "org.springframework.boot.actuate.endpoint.annotation.AbstractDiscoveredOperation",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractWebMvcEndpointHandlerMapping.java",
          "lineNumber": 357,
          "className": "org.springframework.boot.actuate.endpoint.web.servlet.AbstractWebMvcEndpointHandlerMapping$ServletWebOperationAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractWebMvcEndpointHandlerMapping.java",
          "lineNumber": 464,
          "className": "org.springframework.boot.actuate.endpoint.web.servlet.AbstractWebMvcEndpointHandlerMapping$OperationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke0",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.NativeMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "jdk.internal.reflect.DelegatingMethodAccessorImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "invoke",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.reflect.Method",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doInvoke",
          "fileName": "InvocableHandlerMethod.java",
          "lineNumber": 205,
          "className": "org.springframework.web.method.support.InvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeForRequest",
          "fileName": "InvocableHandlerMethod.java",
          "lineNumber": 150,
          "className": "org.springframework.web.method.support.InvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeAndHandle",
          "fileName": "ServletInvocableHandlerMethod.java",
          "lineNumber": 117,
          "className": "org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeHandlerMethod",
          "fileName": "RequestMappingHandlerAdapter.java",
          "lineNumber": 895,
          "className": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleInternal",
          "fileName": "RequestMappingHandlerAdapter.java",
          "lineNumber": 808,
          "className": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handle",
          "fileName": "AbstractHandlerMethodAdapter.java",
          "lineNumber": 87,
          "className": "org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doDispatch",
          "fileName": "DispatcherServlet.java",
          "lineNumber": 1072,
          "className": "org.springframework.web.servlet.DispatcherServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doService",
          "fileName": "DispatcherServlet.java",
          "lineNumber": 965,
          "className": "org.springframework.web.servlet.DispatcherServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "processRequest",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 1006,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doGet",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 898,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "HttpServlet.java",
          "lineNumber": 503,
          "className": "javax.servlet.http.HttpServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "FrameworkServlet.java",
          "lineNumber": 883,
          "className": "org.springframework.web.servlet.FrameworkServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "service",
          "fileName": "HttpServlet.java",
          "lineNumber": 590,
          "className": "javax.servlet.http.HttpServlet",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletHandler.java",
          "lineNumber": 74,
          "className": "io.undertow.servlet.handlers.ServletHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 129,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "JwtAuthenticationFilter.kt",
          "lineNumber": 95,
          "className": "org.radarbase.management.security.JwtAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 337,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invoke",
          "fileName": "FilterSecurityInterceptor.java",
          "lineNumber": 115,
          "className": "org.springframework.security.web.access.intercept.FilterSecurityInterceptor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterSecurityInterceptor.java",
          "lineNumber": 81,
          "className": "org.springframework.security.web.access.intercept.FilterSecurityInterceptor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ExceptionTranslationFilter.java",
          "lineNumber": 122,
          "className": "org.springframework.security.web.access.ExceptionTranslationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ExceptionTranslationFilter.java",
          "lineNumber": 116,
          "className": "org.springframework.security.web.access.ExceptionTranslationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SessionManagementFilter.java",
          "lineNumber": 126,
          "className": "org.springframework.security.web.session.SessionManagementFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SessionManagementFilter.java",
          "lineNumber": 81,
          "className": "org.springframework.security.web.session.SessionManagementFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "AnonymousAuthenticationFilter.java",
          "lineNumber": 109,
          "className": "org.springframework.security.web.authentication.AnonymousAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextHolderAwareRequestFilter.java",
          "lineNumber": 149,
          "className": "org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "RequestCacheAwareFilter.java",
          "lineNumber": 63,
          "className": "org.springframework.security.web.savedrequest.RequestCacheAwareFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "JwtAuthenticationFilter.kt",
          "lineNumber": 95,
          "className": "org.radarbase.management.security.JwtAuthenticationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OAuth2AuthenticationProcessingFilter.java",
          "lineNumber": 182,
          "className": "org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationProcessingFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "LogoutFilter.java",
          "lineNumber": 103,
          "className": "org.springframework.security.web.authentication.logout.LogoutFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "LogoutFilter.java",
          "lineNumber": 89,
          "className": "org.springframework.security.web.authentication.logout.LogoutFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doHeadersAfter",
          "fileName": "HeaderWriterFilter.java",
          "lineNumber": 90,
          "className": "org.springframework.security.web.header.HeaderWriterFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "HeaderWriterFilter.java",
          "lineNumber": 75,
          "className": "org.springframework.security.web.header.HeaderWriterFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextPersistenceFilter.java",
          "lineNumber": 112,
          "className": "org.springframework.security.web.context.SecurityContextPersistenceFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "SecurityContextPersistenceFilter.java",
          "lineNumber": 82,
          "className": "org.springframework.security.web.context.SecurityContextPersistenceFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "WebAsyncManagerIntegrationFilter.java",
          "lineNumber": 55,
          "className": "org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "ForceEagerSessionCreationFilter.java",
          "lineNumber": 45,
          "className": "org.springframework.security.web.session.ForceEagerSessionCreationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "ForceEagerSessionCreationFilter.java",
          "lineNumber": 45,
          "className": "org.springframework.security.web.session.ForceEagerSessionCreationFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "DisableEncodeUrlFilter.java",
          "lineNumber": 42,
          "className": "org.springframework.security.web.session.DisableEncodeUrlFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 346,
          "className": "org.springframework.security.web.FilterChainProxy$VirtualFilterChain",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 221,
          "className": "org.springframework.security.web.FilterChainProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterChainProxy.java",
          "lineNumber": 186,
          "className": "org.springframework.security.web.FilterChainProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeDelegate",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 354,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 267,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "RequestContextFilter.java",
          "lineNumber": 100,
          "className": "org.springframework.web.filter.RequestContextFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "FormContentFilter.java",
          "lineNumber": 93,
          "className": "org.springframework.web.filter.FormContentFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "SessionRepositoryFilter.java",
          "lineNumber": 142,
          "className": "org.springframework.session.web.http.SessionRepositoryFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 82,
          "className": "org.springframework.session.web.http.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "invokeDelegate",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 354,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "DelegatingFilterProxy.java",
          "lineNumber": 267,
          "className": "org.springframework.web.filter.DelegatingFilterProxy",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "WebMvcMetricsFilter.java",
          "lineNumber": 96,
          "className": "org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilterInternal",
          "fileName": "CharacterEncodingFilter.java",
          "lineNumber": 201,
          "className": "org.springframework.web.filter.CharacterEncodingFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "OncePerRequestFilter.java",
          "lineNumber": 117,
          "className": "org.springframework.web.filter.OncePerRequestFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "ManagedFilter.java",
          "lineNumber": 67,
          "className": "io.undertow.servlet.core.ManagedFilter",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doFilter",
          "fileName": "FilterHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.FilterHandler$FilterChainImpl",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "FilterHandler.java",
          "lineNumber": 84,
          "className": "io.undertow.servlet.handlers.FilterHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletSecurityRoleHandler.java",
          "lineNumber": 62,
          "className": "io.undertow.servlet.handlers.security.ServletSecurityRoleHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletChain.java",
          "lineNumber": 68,
          "className": "io.undertow.servlet.handlers.ServletChain$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletDispatchingHandler.java",
          "lineNumber": 36,
          "className": "io.undertow.servlet.handlers.ServletDispatchingHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "RedirectDirHandler.java",
          "lineNumber": 68,
          "className": "io.undertow.servlet.handlers.RedirectDirHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "SSLInformationAssociationHandler.java",
          "lineNumber": 117,
          "className": "io.undertow.servlet.handlers.security.SSLInformationAssociationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletAuthenticationCallHandler.java",
          "lineNumber": 57,
          "className": "io.undertow.servlet.handlers.security.ServletAuthenticationCallHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AbstractConfidentialityHandler.java",
          "lineNumber": 46,
          "className": "io.undertow.security.handlers.AbstractConfidentialityHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletConfidentialityConstraintHandler.java",
          "lineNumber": 64,
          "className": "io.undertow.servlet.handlers.security.ServletConfidentialityConstraintHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AuthenticationMechanismsHandler.java",
          "lineNumber": 60,
          "className": "io.undertow.security.handlers.AuthenticationMechanismsHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "CachedAuthenticatedSessionHandler.java",
          "lineNumber": 77,
          "className": "io.undertow.servlet.handlers.security.CachedAuthenticatedSessionHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "AbstractSecurityContextAssociationHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.security.handlers.AbstractSecurityContextAssociationHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "SendErrorPageHandler.java",
          "lineNumber": 52,
          "className": "io.undertow.servlet.handlers.SendErrorPageHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "PredicateHandler.java",
          "lineNumber": 43,
          "className": "io.undertow.server.handlers.PredicateHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleFirstRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 275,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "access$100",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 79,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 134,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$2",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 131,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$2",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ServletRequestContextThreadSetupAction.java",
          "lineNumber": 48,
          "className": "io.undertow.servlet.core.ServletRequestContextThreadSetupAction$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "call",
          "fileName": "ContextClassLoaderSetupAction.java",
          "lineNumber": 43,
          "className": "io.undertow.servlet.core.ContextClassLoaderSetupAction$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "dispatchRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 255,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "access$000",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 79,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "handleRequest",
          "fileName": "ServletInitialHandler.java",
          "lineNumber": 100,
          "className": "io.undertow.servlet.handlers.ServletInitialHandler$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRootHandler",
          "fileName": "Connectors.java",
          "lineNumber": 395,
          "className": "io.undertow.server.Connectors",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HttpServerExchange.java",
          "lineNumber": 852,
          "className": "io.undertow.server.HttpServerExchange$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "ContextClassLoaderSavingRunnable.java",
          "lineNumber": 35,
          "className": "org.jboss.threads.ContextClassLoaderSavingRunnable",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "safeRun",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2019,
          "className": "org.jboss.threads.EnhancedQueueExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "doRunTask",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1558,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1449,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "XNIO-1 task-6",
      "threadId": 318,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 30,
      "lockName": "org.jboss.threads.EnhancedQueueExecutor@48cf9059",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 2194,
          "className": "org.jboss.threads.EnhancedQueueExecutor$PoolThreadNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "EnhancedQueueExecutor.java",
          "lineNumber": 1481,
          "className": "org.jboss.threads.EnhancedQueueExecutor$ThreadBody",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "XnioWorker.java",
          "lineNumber": 1282,
          "className": "org.xnio.XnioWorker$WorkerThreadFactory$1$1",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "org.jboss.threads.EnhancedQueueExecutor",
        "identityHashCode": 1221562457
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-6",
      "threadId": 373,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 8469,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "DefaultDispatcher-worker-6",
      "threadId": 393,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 21,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-5",
      "threadId": 394,
      "blockedTime": -1,
      "blockedCount": 2,
      "waitedTime": -1,
      "waitedCount": 22,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "DefaultDispatcher-worker-3",
      "threadId": 395,
      "blockedTime": -1,
      "blockedCount": 1,
      "waitedTime": -1,
      "waitedCount": 22,
      "lockName": null,
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": true,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "park",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 795,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "tryPark",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 740,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "runWorker",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 711,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "CoroutineScheduler.kt",
          "lineNumber": 664,
          "className": "kotlinx.coroutines.scheduling.CoroutineScheduler$Worker",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": null
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-2",
      "threadId": 398,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 7282,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "management-portal-Executor-1",
      "threadId": 399,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 2,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@57b110d5",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1471221973
      }
    },
    {
      "threadName": "management-portal-Executor-2",
      "threadId": 403,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 2,
      "lockName": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@57b110d5",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "block",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionNode",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "unmanagedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "managedBlock",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ForkJoinPool",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "await",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "take",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.LinkedBlockingQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject",
        "identityHashCode": 1471221973
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-3",
      "threadId": 404,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 3092,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-5",
      "threadId": 405,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 1327,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-4",
      "threadId": 407,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 3201,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-9",
      "threadId": 408,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 1319,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-1",
      "threadId": 409,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 1856,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    },
    {
      "threadName": "hz.ManagementPortal.cached.thread-8",
      "threadId": 410,
      "blockedTime": -1,
      "blockedCount": 0,
      "waitedTime": -1,
      "waitedCount": 286,
      "lockName": "java.util.concurrent.SynchronousQueue$TransferStack@296e2b7d",
      "lockOwnerId": -1,
      "lockOwnerName": null,
      "daemon": false,
      "inNative": false,
      "suspended": false,
      "threadState": "TIMED_WAITING",
      "priority": 5,
      "stackTrace": [
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "park",
          "fileName": null,
          "lineNumber": -2,
          "className": "jdk.internal.misc.Unsafe",
          "nativeMethod": true
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "parkNanos",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.locks.LockSupport",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "transfer",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue$TransferStack",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "poll",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.SynchronousQueue",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "getTask",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "runWorker",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.util.concurrent.ThreadPoolExecutor$Worker",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": "java.base",
          "moduleVersion": "17.0.16",
          "methodName": "run",
          "fileName": null,
          "lineNumber": -1,
          "className": "java.lang.Thread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "executeRun",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 76,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        },
        {
          "classLoaderName": null,
          "moduleName": null,
          "moduleVersion": null,
          "methodName": "run",
          "fileName": "HazelcastManagedThread.java",
          "lineNumber": 102,
          "className": "com.hazelcast.internal.util.executor.HazelcastManagedThread",
          "nativeMethod": false
        }
      ],
      "lockedMonitors": [],
      "lockedSynchronizers": [],
      "lockInfo": {
        "className": "java.util.concurrent.SynchronousQueue$TransferStack",
        "identityHashCode": 695085949
      }
    }
  ]
}
// http://localhost/managementportal/management/health
//   200 OK
const healthresp = {
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    },
    "hazelcast": {
      "status": "UP",
      "details": {
        "name": "ManagementPortal",
        "uuid": "4052bb86-8e8a-4749-a671-de60311040d0"
      }
    },
    "livenessState": {
      "status": "UP"
    },
    "ping": {
      "status": "UP"
    },
    "readinessState": {
      "status": "UP"
    }
  },
  "groups": [
    "liveness",
    "readiness"
  ]
}

// http://localhost/managementportal/management/audits?page=0&size=20&fromDate=2026-07-04&toDate=2026-08-05
//   GET
// 200 OK
// x-total-count 7004
const auditResp = [
  {
    "timestamp": "2026-07-05T10:52:24.339044Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS",
    "data": {
      "sessionId": "6e3d4c4d-dea3-43ab-bab8-1d967dea9539"
    }
  },
  {
    "timestamp": "2026-07-05T10:52:24.734320Z",
    "principal": "appconfig_frontend",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:24.822447Z",
    "principal": "admin",
    "type": "GRANT_ACCESS_TOKEN",
    "data": {
      "expiresIn": "899",
      "sub": "admin",
      "clientId": "appconfig_frontend",
      "sources": "[]",
      "grant_type": "authorization_code",
      "scope": "MEASUREMENT.CREATE, OAUTHCLIENTS.READ, PROJECT.CREATE, PROJECT.READ, PROJECT.UPDATE, SOURCETYPE.READ, SUBJECT.READ, SUBJECT.UPDATE",
      "roles": "[ROLE_SYS_ADMIN]",
      "iss": "ManagementPortal",
      "tokenType": "bearer",
      "grantType": "authorization_code",
      "iat": "1783248744"
    }
  },
  {
    "timestamp": "2026-07-05T10:52:25.596008Z",
    "principal": "radar_appconfig",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:25.601624Z",
    "principal": "radar_appconfig",
    "type": "GRANT_ACCESS_TOKEN",
    "data": {
      "expiresIn": "900",
      "clientId": "radar_appconfig",
      "grant_type": "client_credentials",
      "scope": "MEASUREMENT.CREATE, OAUTHCLIENTS.READ, PROJECT.READ, SOURCETYPE.READ, SUBJECT.READ",
      "iss": "ManagementPortal",
      "tokenType": "bearer",
      "grantType": "client_credentials",
      "iat": "1783248745"
    }
  },
  {
    "timestamp": "2026-07-05T10:52:25.853303Z",
    "principal": "radar_appconfig",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:31.490938Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:33.059791Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:45.701135Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:52:46.398223Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T10:54:19.646489Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:01:38.181746Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:01:38.342940Z",
    "principal": "radar_appconfig",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:01:38.354984Z",
    "principal": "radar_appconfig",
    "type": "GRANT_ACCESS_TOKEN",
    "data": {
      "expiresIn": "900",
      "clientId": "radar_appconfig",
      "grant_type": "client_credentials",
      "scope": "MEASUREMENT.CREATE, OAUTHCLIENTS.READ, PROJECT.READ, SOURCETYPE.READ, SUBJECT.READ",
      "iss": "ManagementPortal",
      "tokenType": "bearer",
      "grantType": "client_credentials",
      "iat": "1783252898"
    }
  },
  {
    "timestamp": "2026-07-05T12:01:38.391304Z",
    "principal": "radar_appconfig",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:02:18.924387Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:03:23.178638Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:17:21.514429Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:18:02.112510Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  },
  {
    "timestamp": "2026-07-05T12:29:28.938486Z",
    "principal": "admin",
    "type": "AUTHENTICATION_SUCCESS"
  }
]

// http://localhost/managementportal/management/logs
//   GET
// 200 OK
const logResp = [
  {
    "name": "ROOT",
    "level": "WARN"
  },
    {
      "name": "LiquibaseSchemaResolver",
      "level": "INFO"
    },
    {
      "name": "_org",
      "level": "WARN"
    },
    {
      "name": "_org.springframework",
      "level": "WARN"
    },
    {
      "name": "_org.springframework.web",
      "level": "WARN"
    },
    {
      "name": "_org.springframework.web.servlet",
      "level": "WARN"
    },
    {
      "name": "_org.springframework.web.servlet.HandlerMapping",
      "level": "WARN"
    },
    {
      "name": "_org.springframework.web.servlet.HandlerMapping.Mappings",
      "level": "WARN"
    },
    {
      "name": "ch",
      "level": "WARN"
    },
    {
      "name": "ch.qos",
      "level": "WARN"
    },
    {
      "name": "ch.qos.logback",
      "level": "WARN"
    },
    {
      "name": "com",
      "level": "WARN"
    },
    {
      "name": "com.codahale",
      "level": "WARN"
    },
    {
      "name": "com.codahale.metrics",
      "level": "WARN"
    },
    {
      "name": "com.hazelcast",
      "level": "WARN"
    },
    {
      "name": "com.hazelcast.cp",
      "level": "WARN"
    },
    {
      "name": "com.hazelcast.cp.CPSubsystem",
      "level": "WARN"
    },
    {
      "name": "com.ryantenney",
      "level": "WARN"
    },
    {
      "name": "com.sun",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.HikariConfig",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.HikariDataSource",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool.HikariPool",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool.PoolBase",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool.PoolEntry",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool.ProxyConnection",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.pool.ProxyLeakTask",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.util",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.util.ConcurrentBag",
      "level": "WARN"
    },
    {
      "name": "com.zaxxer.hikari.util.DriverDataSource",
      "level": "WARN"
    },
    {
      "name": "io",
      "level": "WARN"
    },
    {
      "name": "io.github",
      "level": "WARN"
    },
    {
      "name": "io.github.jhipster",
      "level": "WARN"
    },
    {
      "name": "io.ktor",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.DefaultRequest",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.DefaultResponseValidation",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.HttpCallValidator",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.HttpPlainText",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.HttpRedirect",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.HttpRequestLifecycle",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.contentnegotiation",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.contentnegotiation.ContentNegotiation",
      "level": "WARN"
    },
    {
      "name": "io.ktor.client.plugins.defaultTransformers",
      "level": "WARN"
    },
    {
      "name": "io.micrometer",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.common",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.common.util",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.common.util.internal",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.common.util.internal.logging",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.common.util.internal.logging.InternalLoggerFactory",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder.cache",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder.cache.HazelcastIMapAdapter",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder.jvm",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder.jvm.ExecutorServiceMetrics",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.binder.jvm.JvmGcMetrics",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.internal",
      "level": "WARN"
    },
    {
      "name": "io.micrometer.core.instrument.internal.DefaultGauge",
      "level": "WARN"
    },
    {
      "name": "io.undertow",
      "level": "WARN"
    },
    {
      "name": "io.undertow.client",
      "level": "WARN"
    },
    {
      "name": "io.undertow.predicate",
      "level": "WARN"
    },
    {
      "name": "io.undertow.proxy",
      "level": "WARN"
    },
    {
      "name": "io.undertow.request",
      "level": "WARN"
    },
    {
      "name": "io.undertow.request.dump",
      "level": "WARN"
    },
    {
      "name": "io.undertow.request.error-response",
      "level": "WARN"
    },
    {
      "name": "io.undertow.request.io",
      "level": "WARN"
    },
    {
      "name": "io.undertow.request.security",
      "level": "WARN"
    },
    {
      "name": "io.undertow.server",
      "level": "WARN"
    },
    {
      "name": "io.undertow.server.HttpServerExchange",
      "level": "WARN"
    },
    {
      "name": "io.undertow.server.handler",
      "level": "WARN"
    },
    {
      "name": "io.undertow.server.handler.transfer-encoding",
      "level": "WARN"
    },
    {
      "name": "io.undertow.servlet",
      "level": "WARN"
    },
    {
      "name": "io.undertow.servlet.request",
      "level": "WARN"
    },
    {
      "name": "io.undertow.session",
      "level": "WARN"
    },
    {
      "name": "io.undertow.websockets",
      "level": "WARN"
    },
    {
      "name": "io.undertow.websockets.jsr",
      "level": "ERROR"
    },
    {
      "name": "io.undertow.websockets.jsr.request",
      "level": "ERROR"
    },
    {
      "name": "javax",
      "level": "WARN"
    },
    {
      "name": "javax.activation",
      "level": "WARN"
    },
    {
      "name": "javax.mail",
      "level": "WARN"
    },
    {
      "name": "javax.xml",
      "level": "WARN"
    },
    {
      "name": "javax.xml.bind",
      "level": "WARN"
    },
    {
      "name": "liquibase",
      "level": "WARN"
    },
    {
      "name": "liquibase.Liquibase",
      "level": "WARN"
    },
    {
      "name": "liquibase.analytics",
      "level": "WARN"
    },
    {
      "name": "liquibase.analytics.configuration",
      "level": "WARN"
    },
    {
      "name": "liquibase.analytics.configuration.AnalyticsArgs",
      "level": "WARN"
    },
    {
      "name": "liquibase.changelog",
      "level": "WARN"
    },
    {
      "name": "liquibase.changelog.DatabaseChangeLog",
      "level": "WARN"
    },
    {
      "name": "liquibase.changelog.FastCheckService",
      "level": "WARN"
    },
    {
      "name": "liquibase.changelog.StandardChangeLogHistoryService",
      "level": "WARN"
    },
    {
      "name": "liquibase.command",
      "level": "WARN"
    },
    {
      "name": "liquibase.command.CommandScope",
      "level": "WARN"
    },
    {
      "name": "liquibase.command.core",
      "level": "WARN"
    },
    {
      "name": "liquibase.command.core.DropAllCommandStep",
      "level": "WARN"
    },
    {
      "name": "liquibase.configuration",
      "level": "WARN"
    },
  {
    "name": "liquibase.configuration.ConfigurationDefinition",
    "level": "WARN"
  },
  {
    "name": "liquibase.configuration.LiquibaseConfiguration",
    "level": "WARN"
  },
  {
    "name": "liquibase.database",
    "level": "WARN"
  },
  {
    "name": "liquibase.database.DatabaseFactory",
    "level": "WARN"
  },
  {
    "name": "liquibase.database.core",
    "level": "WARN"
  },
  {
    "name": "liquibase.database.core.PostgresDatabase",
    "level": "WARN"
  },
  {
    "name": "liquibase.executor",
    "level": "WARN"
  },
  {
    "name": "liquibase.executor.jvm",
    "level": "WARN"
  },
  {
    "name": "liquibase.executor.jvm.ChangelogJdbcMdcListener",
    "level": "WARN"
  },
  {
    "name": "liquibase.integration",
    "level": "WARN"
  },
  {
    "name": "liquibase.integration.spring",
    "level": "WARN"
  },
  {
    "name": "liquibase.integration.spring.SpringLiquibase",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.ChangeLogParserFactory",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.json",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.json.JsonChangeLogParser",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.xml",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.xml.LiquibaseEntityResolver",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.xml.XMLChangeLogSAXHandler",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.yaml",
    "level": "WARN"
  },
  {
    "name": "liquibase.parser.core.yaml.YamlChangeLogParser",
    "level": "WARN"
  },
  {
    "name": "liquibase.servicelocator",
    "level": "WARN"
  },
  {
    "name": "liquibase.servicelocator.StandardServiceLocator",
    "level": "WARN"
  },
  {
    "name": "liquibase.snapshot",
    "level": "WARN"
  },
  {
    "name": "liquibase.snapshot.DatabaseSnapshot",
    "level": "WARN"
  },
  {
    "name": "liquibase.snapshot.jvm",
    "level": "WARN"
  },
  {
    "name": "liquibase.snapshot.jvm.ColumnSnapshotGenerator",
    "level": "WARN"
  },
  {
    "name": "liquibase.ui",
    "level": "WARN"
  },
  {
    "name": "liquibase.ui.LoggerUIService",
    "level": "WARN"
  },
  {
    "name": "liquibase.util",
    "level": "WARN"
  },
  {
    "name": "liquibase.util.MD5Util",
    "level": "WARN"
  },
  {
    "name": "liquibase.util.ShowSummaryUtil",
    "level": "WARN"
  },
  {
    "name": "org",
    "level": "WARN"
  },
  {
    "name": "org.apache",
    "level": "WARN"
  },
  {
    "name": "org.apache.catalina",
    "level": "WARN"
  },
  {
    "name": "org.apache.catalina.startup",
    "level": "WARN"
  },
  {
    "name": "org.apache.catalina.startup.DigesterFactory",
    "level": "OFF"
  },
  {
    "name": "org.apache.catalina.util",
    "level": "WARN"
  },
  {
    "name": "org.apache.catalina.util.LifecycleBase",
    "level": "ERROR"
  },
  {
    "name": "org.apache.coyote",
    "level": "WARN"
  },
  {
    "name": "org.apache.coyote.http11",
    "level": "WARN"
  },
  {
    "name": "org.apache.coyote.http11.Http11NioProtocol",
    "level": "WARN"
  },
  {
    "name": "org.apache.sshd",
    "level": "WARN"
  },
  {
    "name": "org.apache.sshd.common",
    "level": "WARN"
  },
  {
    "name": "org.apache.sshd.common.util",
    "level": "WARN"
  },
  {
    "name": "org.apache.sshd.common.util.SecurityUtils",
    "level": "WARN"
  },
  {
    "name": "org.apache.tomcat",
    "level": "WARN"
  },
  {
    "name": "org.apache.tomcat.util",
    "level": "WARN"
  },
  {
    "name": "org.apache.tomcat.util.net",
    "level": "WARN"
  },
  {
    "name": "org.apache.tomcat.util.net.NioSelectorPool",
    "level": "WARN"
  },
  {
    "name": "org.bson",
    "level": "WARN"
  },
  {
    "name": "org.eclipse",
    "level": "WARN"
  },
  {
    "name": "org.eclipse.jetty",
    "level": "WARN"
  },
  {
    "name": "org.eclipse.jetty.util",
    "level": "WARN"
  },
  {
    "name": "org.eclipse.jetty.util.component",
    "level": "WARN"
  },
  {
    "name": "org.eclipse.jetty.util.component.AbstractLifeCycle",
    "level": "ERROR"
  },
  {
    "name": "org.hibernate",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.MultiTenancyStrategy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.SQL",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.SQL_SLOW",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.Version",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.annotations",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.annotations.common",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.annotations.common.Version",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.annotations.common.util",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.annotations.common.util.StandardClassLoaderDelegateImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.MetadataSources",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.cfgxml",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.cfgxml.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.cfgxml.internal.ConfigLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.cfgxml.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.cfgxml.spi.LoadedConfig",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.BootstrapContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.ClassLoaderAccessImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.IdGeneratorInterpreterImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.InFlightMetadataCollectorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.MetadataBuilderImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.internal.SessionFactoryOptionsBuilder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal.AbstractBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal.MappingBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal.stax",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal.stax.LocalSchemaLocator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.jaxb.internal.stax.LocalXmlResourceResolver",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.convert",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.convert.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.convert.internal.AttributeConverterManager",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.process",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.process.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.process.internal.ScanningCoordinator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.process.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.process.spi.MetadataBuildingProcess",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.relational",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.relational.Namespace",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.relational.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.relational.internal.SqlStringGenerationContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.annotations",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.annotations.AnnotationMetadataSourceProcessorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.hbm",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.hbm.EntityHierarchyBuilder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.hbm.HbmMetadataSourceProcessorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.hbm.MappingDocument",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.model.source.internal.hbm.ModelBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.classloading",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.classloading.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.classloading.internal.AggregatedServiceLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.classloading.internal.ClassLoaderServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.internal.BootstrapServiceRegistryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.selector",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.selector.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.selector.internal.StrategySelectorBuilder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.registry.selector.internal.StrategySelectorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.boot.spi.XmlMappingBinderAccess",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.bytecode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.bytecode.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.bytecode.internal.bytebuddy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.bytecode.internal.bytebuddy.ByteBuddyState",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal.CollectionCacheInvalidator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal.EnabledCaching",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal.RegionFactoryInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal.StrategyCreatorRegionFactoryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.internal.TimestampsCacheDisabledImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.spi.support",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.spi.support.AbstractCachedDomainDataAccess",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.spi.support.AbstractDomainDataRegion",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cache.spi.support.DomainDataRegionTemplate",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.AbstractPropertyHolder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.AnnotationBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.BinderHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.CollectionPropertyHolder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.CollectionSecondPass",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.Ejb3Column",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.Environment",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.PropertyContainer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.Settings",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.CollectionBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.EntityBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.PropertyBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.QueryBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.ResultsetMappingSecondPass",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.SimpleValueBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.TableBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.reflection",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.reflection.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.annotations.reflection.internal.XMLContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.beanvalidation",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.beanvalidation.BeanValidationEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.beanvalidation.BeanValidationIntegrator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.cfg.beanvalidation.TypeSafeActivator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.collection",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.collection.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.collection.internal.AbstractPersistentCollection",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.dialect",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.dialect.Dialect",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.dialect.function",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.dialect.function.TemplateRenderer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.ejb",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.ejb.HibernatePersistence",
    "level": "OFF"
  },
  {
    "name": "org.hibernate.engine",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.config",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.config.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.config.internal.ConfigurationServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.Cascade",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.Collections",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.EntityEntryContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.NaturalIdXrefDelegate",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.StatefulPersistenceContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.TwoPhaseLoad",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.internal.Versioning",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.batch",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.batch.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.batch.internal.AbstractBatchImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.batch.internal.NonBatchingBatch",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.connections",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.connections.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.connections.internal.ConnectionProviderInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.connections.internal.MultiTenantConnectionProviderInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.cursor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.cursor.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.cursor.internal.StandardRefCursorSupport",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.dialect",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.dialect.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.dialect.internal.DialectResolverSet",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal.DefaultSchemaNameResolver",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal.JdbcEnvironmentImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal.JdbcEnvironmentInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal.LobCreatorBuilderImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.internal.NormalizingIdentifierHelperImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.env.spi.IdentifierHelperBuilder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.internal.JdbcCoordinatorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jdbc.spi.SqlExceptionHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jndi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jndi.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.jndi.internal.JndiServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.loading",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.loading.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.loading.internal.CollectionLoadContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.loading.internal.LoadContexts",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.query",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.query.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.query.spi.EntityGraphQueryHint",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.query.spi.HQLQueryPlan",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.query.spi.QueryPlanCache",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.ActionQueue",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.BatchFetchQueue",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.CascadeStyles",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.CascadingAction",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.CollectionEntry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.EffectiveEntityGraph",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.IdentifierValue",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.spi.QueryParameters",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.internal.TransactionImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.jta",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.jta.platform",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.jta.platform.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformResolverInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.boot",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.boot.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.boot.internal.AdditionalJaxbMappingProducerImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.boot.internal.EnversIntegrator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.boot.internal.EnversServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.ClassesAuditingData",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.metadata",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.metadata.AuditMetadataGenerator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.metadata.CollectionMetadataGenerator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.metadata.reader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.configuration.internal.metadata.reader.AuditedPropertiesReader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.entities",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.entities.mapper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.entities.mapper.relation",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.entities.mapper.relation.ToOneIdMapper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.reader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.reader.FirstLevelCache",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.synchronization",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.envers.internal.synchronization.AuditProcess",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.AbstractFlushingEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.AbstractLockUpgradeEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.AbstractReassociateEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.AbstractSaveEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultAutoFlushEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultDeleteEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultDirtyCheckEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultEvictEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultFlushEntityEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultInitializeCollectionEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultLoadEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultLockEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultMergeEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultPersistEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultRefreshEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultReplicateEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultResolveNaturalIdEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.DefaultSaveOrUpdateEventListener",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.EntityCopyObserverFactoryInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.EntityState",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.EvictVisitor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.MergeContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.internal.WrapVisitor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.service",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.service.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.service.internal.EventListenerGroupImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.event.service.internal.PostCommitEventListenerGroupImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.graph",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.graph.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.graph.internal.AttributeNodeImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.QuerySplitter",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.QueryTranslatorFactoryInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.antlr",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.antlr.HqlSqlBaseWalker",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.ASTQueryTranslatorFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.ErrorTracker",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.HqlParser",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.HqlSqlWalker",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.QueryTranslatorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.SqlGenerator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.AggregateNode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.DotNode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.FromClause",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.FromElement",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.FromElementFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.FromElementType",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.FromReferenceNode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.MethodNode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.QueryNode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.tree.UpdateStatement",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.util",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.util.JoinProcessor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.util.LiteralProcessor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.util.PathHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.internal.ast.util.SyntheticAndFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.spi.id",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.hql.spi.id.IdTableHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.IdentifierGeneratorHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced.OptimizerFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced.PooledOptimizer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced.SequenceStructure",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced.SequenceStyleGenerator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.enhanced.StandardOptimizerDescriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.factory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.factory.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.id.factory.internal.DefaultIdentifierGeneratorFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.integrator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.integrator.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.integrator.internal.IntegratorServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.ExceptionConverterImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.SessionFactoryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.SessionFactoryImpl$SessionBuilderImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.SessionFactoryRegistry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.SessionImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.util",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.internal.util.ConfigHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jdbc.Expectations",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.HibernatePersistenceProvider",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.boot",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.boot.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.event",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.event.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.event.internal.CallbackDefinitionResolverLegacyImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.event.internal.CallbacksFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.internal.PersistenceUnitUtilImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.internal.util",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.jpa.internal.util.LogHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.BatchFetchStyle",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.Loader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.collection",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.collection.BasicCollectionLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.collection.plan",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.collection.plan.AbstractLoadPlanBasedCollectionInitializer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.collection.plan.CollectionLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.entity",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.entity.CacheEntityLoaderHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.entity.plan",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.entity.plan.AbstractLoadPlanBasedEntityLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.entity.plan.EntityLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.internal.AbstractLoadPlanBuildingAssociationVisitationStrategy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.internal.FetchStyleLoadPlanBuildingAssociationVisitationStrategy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.internal.spaces",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.internal.spaces.QuerySpacesImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.build.spi.LoadPlanTreePrinter",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.internal.AbstractLoadPlanBasedLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.internal.AliasResolutionContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.internal.LoadQueryJoinAndFetchProcessor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal.AbstractRowReader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal.CollectionReferenceInitializerImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal.EntityReferenceInitializerImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal.ResultSetProcessingContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.loader.plan.exec.process.internal.ResultSetProcessorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.mapping",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.mapping.PrimaryKey",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.mapping.RootClass",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.mapping.SimpleValue",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.mapping.Table",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.metamodel",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.metamodel.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.metamodel.internal.AttributeFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.metamodel.internal.MetadataContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.metamodel.internal.MetamodelImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.orm",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.orm.bytecode",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.orm.bytecode.interceptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.collection",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.collection.AbstractCollectionPersister",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.entity",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.entity.AbstractEntityPersister",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.entity.AbstractPropertyMapping",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.walking",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.walking.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.persister.walking.spi.MetamodelGraphWalker",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.proxy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.proxy.pojo",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.proxy.pojo.bytebuddy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.proxy.pojo.bytebuddy.ByteBuddyProxyHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.criteria",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.criteria.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.criteria.internal.CriteriaQueryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.internal.AbstractProducedQuery",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.internal.QueryParameterBindingsImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.query.spi.NamedQueryRepository",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.beans",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.beans.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.beans.internal.FallbackBeanInstanceProducer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.jdbc.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.jdbc.internal.AbstractLogicalConnectionImplementor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.jdbc.internal.LogicalConnectionManagedImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.jdbc.internal.ResourceRegistryStandardImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.backend",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.backend.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.backend.jdbc.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.resource.transaction.internal.SynchronizationRegistryStandardImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.secure",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.secure.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.secure.internal.DisabledJaccServiceImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.secure.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.secure.spi.JaccIntegrator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service.internal.AbstractServiceRegistryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service.internal.SessionFactoryServiceRegistryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.service.spi.ServiceBinding",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql.ordering",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql.ordering.antlr",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql.ordering.antlr.OrderByFragmentParser",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql.ordering.antlr.OrderByFragmentRenderer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.sql.ordering.antlr.OrderByFragmentTranslator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.stat",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.stat.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.stat.internal.StatisticsImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.stat.internal.StatisticsInitiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tool",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tool.schema",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tool.schema.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple.PojoInstantiator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple.entity",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple.entity.DynamicMapEntityTuplizer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple.entity.EntityMetamodel",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.tuple.entity.PojoEntityTuplizer",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.BasicTypeRegistry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.CollectionType",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.DbTimestampType",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.EnumType",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.java",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.java.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.java.spi.JavaTypeDescriptorRegistry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.java.spi.RegistryHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.sql",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.sql.BasicBinder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.sql.BasicExtractor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.descriptor.sql.SqlTypeDescriptorRegistry",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.spi",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.spi.TypeConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.type.spi.TypeConfiguration$Scope",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.cfg",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.cfg.context",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.cfg.context.DefaultConstraintMapping",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators.bv",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators.bv.PatternValidator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators.bv.size",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.constraintvalidators.bv.size.SizeValidatorForCharSequence",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.AbstractConfigurationImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.ValidatorContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.ValidatorFactoryConfigurationHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.ValidatorFactoryImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.ValidatorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.AbstractConstraintValidatorManagerImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.ClassBasedValidatorDescriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.ConstraintTree",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorContextImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorManagerImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.constraintvalidation.SimpleConstraintTree",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.groups",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.groups.Sequence",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.path",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.path.NodeImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.path.PathImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.resolver",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.resolver.JPATraversableResolver",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.resolver.TraversableResolvers",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.scripting",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.scripting.DefaultScriptEvaluatorFactory",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.validationcontext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.validationcontext.AbstractValidationContext",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.valueextraction",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.valueextraction.ValueExtractorDescriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.engine.valueextraction.ValueExtractorResolver",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.BeanMetaDataImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.CascadingMetaDataBuilder",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.NonContainerCascadingMetaData",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.PropertyMetaData",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.rule",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.aggregated.rule.MethodConfigurationRule",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.core",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.core.AnnotationProcessingOptionsImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.core.ConstraintHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.core.MetaConstraints",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.descriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.provider",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.provider.AnnotationMetaDataProvider",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.provider.ProgrammaticMetaDataProvider",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.raw",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.metadata.raw.ConstrainedExecutable",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.properties",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.properties.DefaultGetterPropertySelectionStrategy",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.properties.javabean",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.properties.javabean.JavaBeanParameter",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.Contracts",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.ExecutableHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.ReflectionHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.TypeHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.TypeVariables",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.Version",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.annotation",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.annotation.AnnotationDescriptor",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.privilegedactions",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.privilegedactions.GetAnnotationAttributes",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.privilegedactions.GetInstancesFromServiceLoader",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.privilegedactions.LoadClass",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.util.privilegedactions.NewInstance",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.xml",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.xml.config",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.xml.config.ResourceLoaderHelper",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.xml.config.ValidationBootstrapParameters",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.internal.xml.config.ValidationXmlParser",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.messageinterpolation",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.messageinterpolation.AbstractMessageInterpolator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.messageinterpolation.ResourceBundleMessageInterpolator",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.resourceloading",
    "level": "WARN"
  },
  {
    "name": "org.hibernate.validator.resourceloading.PlatformResourceBundleLocator",
    "level": "WARN"
  },
  {
    "name": "org.jboss",
    "level": "WARN"
  },
  {
    "name": "org.jboss.logging",
    "level": "WARN"
  },
  {
    "name": "org.jboss.threads",
    "level": "WARN"
  },
  {
    "name": "org.jboss.threads.errors",
    "level": "WARN"
  },
  {
    "name": "org.jboss.threads.interrupt-handler",
    "level": "WARN"
  },
  {
    "name": "org.radarbase",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.authentication",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.authentication.TokenValidator",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.jwks",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.jwks.JwksTokenVerifierLoader",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.jwt",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.auth.jwt.JwtTokenVerifier",
    "level": "WARN"
  },
  {
    "name": "org.radarbase.management",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.ManagementPortalApp",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.ManagementPortalApp$Companion",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.AsyncConfiguration",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.CacheConfiguration",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.DatabaseConfiguration",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.ManagementPortalSecurityConfigLoader",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.OAuth2ServerConfiguration",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.OAuth2ServerConfiguration$ResourceServerConfiguration",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.OAuth2ServerConfiguration$ResourceServerConfiguration$CustomEventPublisher",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.SourceTypeLoader",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.config.WebConfigurer",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.domain",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.domain.support",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.domain.support.AbstractEntityListener",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.repository",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.repository.CustomAuditEventRepository",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.repository.filters",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.repository.filters.UserFilter",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.ClaimsTokenEnhancer",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.DomainUserDetailsService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.Http401UnauthorizedEntryPoint",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.JwtAuthenticationFilter",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.PostgresApprovalStore",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.jwt",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.jwt.ManagementPortalJwtAccessTokenConverter",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.jwt.ManagementPortalOauthKeyStoreHandler",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.security.jwt.RadarTokenLoader",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.MailService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.MetaTokenService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.OAuthClientService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.OrganizationService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.ProjectService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.RevisionService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.RoleService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.SourceDataService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.SourceService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.SourceTypeService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.SubjectService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.service.UserService",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.AccountResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.AuthorityResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.OAuthClientsResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.OrganizationResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.ProjectResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.PublicResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.RevisionResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.RoleResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.SiteSettingsResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.SourceDataResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.SourceResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.SourceTypeResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.SubjectResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.TokenKeyEndpoint",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.UserResource",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.errors",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.errors.ExceptionTranslator",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.util",
    "level": "INFO"
  },
  {
    "name": "org.radarbase.management.web.rest.util.HeaderUtil",
    "level": "INFO"
  },
  {
    "name": "org.springdoc",
    "level": "WARN"
  },
  {
    "name": "org.springdoc.core",
    "level": "WARN"
  },
  {
    "name": "org.springdoc.core.MultipleOpenApiSupportCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.aspectj",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.aspectj.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.aspectj.annotation.AnnotationAwareAspectJAutoProxyCreator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.aspectj.annotation.ReflectiveAspectJAdvisorFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.CglibAopProxy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.JdkDynamicAopProxy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.ObjenesisCglibAopProxy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.ProxyFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.autoproxy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.framework.autoproxy.BeanFactoryAdvisorRetrievalHelper",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.target",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.target.LazyInitTargetSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.aop.target.SimpleBeanTargetSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.AbstractNestablePropertyAccessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.CachedIntrospectionResults",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.ExtendedBeanInfo",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.TypeConverterDelegate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.config.ObjectFactoryCreatingFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.config.PropertiesFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.parsing",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.parsing.FailFastProblemReporter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.support.DefaultListableBeanFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.support.DisposableBeanAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.wiring",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.wiring.BeanConfigurerSupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.xml",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.xml.DefaultDocumentLoader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.beans.factory.xml.XmlBeanDefinitionReader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.BeanDefinitionLoader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.BeanDefinitionLoader$ClassExcludeFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.DefaultApplicationArguments",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.DefaultApplicationArguments$Source",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.DefaultPropertiesPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.ResourceBanner",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.SpringApplication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.SpringApplicationShutdownHook",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.StartupInfoLogger",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.audit",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.audit.listener",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.audit.listener.AuditListener",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.availability",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.availability.AvailabilityProbesAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.availability.AvailabilityProbesAutoConfiguration$ProbesCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.endpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.endpoint.condition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.endpoint.condition.OnAvailableEndpointCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.health",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.health.OnEnabledHealthIndicatorCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.info",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.info.OnEnabledInfoContributorCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.logging",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.logging.LogFileWebEndpointAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.logging.LogFileWebEndpointAutoConfiguration$LogFileCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.logging.LoggersEndpointAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.logging.LoggersEndpointAutoConfiguration$OnEnabledLoggingSystemCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.CompositeMeterRegistryConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.CompositeMeterRegistryConfiguration$MultipleNonPrimaryMeterRegistriesCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.LogbackMetricsAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.LogbackMetricsAutoConfiguration$LogbackLoggingCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryConfigurer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.OnlyOnceLoggingDenyMeterFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.export",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.export.OnMetricsExportEnabledCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.jdbc.DataSourcePoolMetricsAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.jdbc.DataSourcePoolMetricsAutoConfiguration$HikariDataSourceMetricsConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.metrics.jdbc.DataSourcePoolMetricsAutoConfiguration$HikariDataSourceMetricsConfiguration$HikariDataSourceMeterBinder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.startup",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.startup.StartupEndpointAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.startup.StartupEndpointAutoConfiguration$ApplicationStartupCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web.server",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration$SameManagementContextConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration$SameManagementContextConfiguration$1",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.autoconfigure.web.server.OnManagementPortCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.availability",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.availability.LivenessStateHealthIndicator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.availability.ReadinessStateHealthIndicator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.EndpointFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.EndpointId",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.annotation.EndpointDiscoverer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.jmx",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.EndpointLinksResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.ServletEndpointRegistrar",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.servlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.servlet.AdditionalHealthEndpointPathsWebMvcHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.servlet.ControllerEndpointHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.endpoint.web.servlet.WebMvcEndpointHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.hazelcast",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.hazelcast.HazelcastHealthIndicator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.health",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.health.HealthEndpointSupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.health.PingHealthIndicator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.jdbc.DataSourceHealthIndicator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.cache",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.cache.CacheMeterBinderProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.cache.CacheMetricsRegistrar",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web.client",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web.client.MetricsClientHttpRequestInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web.servlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web.servlet.LongTaskTimingHandlerInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.ansi",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.ansi.AnsiPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.AutoConfigurationImportSelector",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.AutoConfigurationPackages",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.cache",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.cache.CacheCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnBeanCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnClassCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnCloudPlatformCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnJndiCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnPropertyCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnResourceCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnWarDeploymentCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.condition.OnWebApplicationCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration$ResourceBundleCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration$HazelcastDataGridCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastClientConfigAvailableCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration$OnHazelcastAndJpaCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastServerConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.hazelcast.HazelcastServerConfiguration$ConfigAvailableCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.http",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration$NotReactiveWebApplicationCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.info",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration$GitResourceAvailableCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration$EmbeddedDatabaseCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration$PooledDataSourceAvailableCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration$PooledDataSourceCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.jdbc.DataSourceJmxConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.liquibase",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration$LiquibaseDataSourceCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.logging",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.mail",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration$MailSenderCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.orm",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.orm.jpa",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.security",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.security.DefaultWebSecurityCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.security.reactive",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration$ReactiveUserDetailsServiceCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session.HazelcastSessionConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session.HazelcastSessionConfiguration$SpringBootHazelcastHttpSessionConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session.ServletSessionCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session.SessionAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.session.SessionAutoConfiguration$DefaultCookieSerializerCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.sql",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.sql.init",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.sql.init.SqlInitializationAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.sql.init.SqlInitializationAutoConfiguration$SqlInitializationModeCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.thymeleaf",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration$DefaultTemplateResolverConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.transaction",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.transaction.PlatformTransactionManagerCustomizer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.transaction.TransactionManagerCustomizers",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.OnEnabledResourceChainCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.client",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration$NotReactiveWebApplicationCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration$DefaultDispatcherServletCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration$DispatcherServletRegistrationCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.WelcomePageHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.WelcomePageNotAcceptableHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.error",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration$ErrorTemplateMissingCondition",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.availability",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.availability.ApplicationAvailabilityBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.ConfigurationWarningsApplicationContextInitializer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.FileEncodingApplicationListener",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataEnvironment",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataEnvironmentContributors",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataEnvironmentPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataImporter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataLoaders",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.config.ConfigDataLocationResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.logging",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.logging.LoggingApplicationListener",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties.PropertySourcesDeducer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties.source",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties.source.ConfigurationPropertySourcesPropertyResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties.source.ConfigurationPropertySourcesPropertyResolver$DefaultResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.context.properties.source.ConfigurationPropertySourcesPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.EnvironmentPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.OriginTrackedMapPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.OriginTrackedYamlLoader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.RandomValuePropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.SpringApplicationJsonEnvironmentPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.SpringApplicationJsonEnvironmentPostProcessor$JsonPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.SystemEnvironmentPropertySourceEnvironmentPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.env.SystemEnvironmentPropertySourceEnvironmentPostProcessor$OriginAwareSystemEnvironmentPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jackson",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jackson.JsonMixinModule",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jackson.JsonMixinModule$JsonMixinComponentScanner",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jdbc.init",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.jdbc.init.DataSourceScriptDatabaseInitializer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.system",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.system.ApplicationPid",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.embedded",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.embedded.undertow",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.embedded.undertow.UndertowWebServer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.server",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.server.WebServerFactoryCustomizer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.server.WebServerFactoryCustomizerBeanPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.DelegatingFilterProxyRegistrationBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.DelegatingFilterProxyRegistrationBean$1",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.RegistrationBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.ServletContextInitializerBeans",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.context.ApplicationServletEnvironment",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.filter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.filter.OrderedFormContentFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.cache",
    "level": "WARN"
  },
  {
    "name": "org.springframework.cache.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.cache.annotation.AnnotationCacheOperationSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.cache.interceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.cache.interceptor.CacheInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.AutoProxyRegistrar",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ClassPathBeanDefinitionScanner",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.CommonAnnotationBeanPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ComponentScanAnnotationParser",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ComponentScanAnnotationParser$1",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ConfigurationClassBeanDefinitionReader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ConfigurationClassEnhancer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ConfigurationClassParser",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ConfigurationClassPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.annotation.ConfigurationClassUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.event",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.event.ApplicationListenerMethodAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.event.EventListenerMethodProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.index",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.index.CandidateComponentsIndexLoader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.ApplicationListenerDetector",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.DefaultLifecycleProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.PostProcessorRegistrationDelegate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.PropertySourcesPlaceholderConfigurer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.PropertySourcesPlaceholderConfigurer$1",
    "level": "WARN"
  },
  {
    "name": "org.springframework.context.support.ResourceBundleMessageSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.LocalVariableTableParameterNameDiscoverer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.MapPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.PropertiesPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.PropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.PropertySource$ComparisonPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.PropertySource$StubPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.PropertySourcesPropertyResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.StandardEnvironment",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.env.SystemEnvironmentPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io.support.PathMatchingResourcePatternResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io.support.ResourceArrayPropertyEditor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io.support.ResourcePropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.io.support.SpringFactoriesLoader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.task",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.task.SimpleAsyncTaskExecutor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.task.SimpleAsyncTaskExecutor$ConcurrencyThrottleAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.type",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.type.filter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.type.filter.AnnotationTypeFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.core.type.filter.AssignableTypeFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.auditing",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.auditing.AuditingHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.auditing.AuditingHandlerSupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.config.JpaMetamodelMappingContextFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query.JpaQueryLookupStrategy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query.NamedQuery",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query.QueryEnhancerFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query.QueryParameterSetter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.jpa.repository.query.QueryParameterSetter$ErrorHandling",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.mapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.mapping.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.mapping.context.MappingContext",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.mapping.model",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.mapping.model.ClassGeneratingEntityInstantiator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config.RepositoryBeanDefinitionBuilder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config.RepositoryComponentProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config.RepositoryComponentProvider$InterfaceTypeFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config.RepositoryConfigurationDelegate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.config.RepositoryConfigurationExtensionSupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.core",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.core.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.core.support.RepositoryFactorySupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.core.support.TransactionalRepositoryProxyPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.repository.core.support.TransactionalRepositoryProxyPostProcessor$RepositoryAnnotationTransactionAttributeSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.data.web.ProxyingHandlerMethodArgumentResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.ByteArrayHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.ResourceHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.ResourceRegionHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.StringHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.json",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.json.KotlinSerializationJsonHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.json.MappingJackson2HttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.xml",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.http.converter.xml.SourceHttpMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.core",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.core.JdbcTemplate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.core.StatementCreatorUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.datasource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.datasource.DataSourceUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.datasource.JdbcTransactionObjectSupport",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.datasource.lookup",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jdbc.support.JdbcUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jndi",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jndi.JndiTemplate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jndi.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.jndi.support.SimpleJndiBeanFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.hibernate5",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.hibernate5.SpringBeanContainer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.EntityManagerFactoryUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.ExtendedEntityManagerCreator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.ExtendedEntityManagerCreator$ExtendedEntityManagerInvocationHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.JpaTransactionManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.SharedEntityManagerCreator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.SharedEntityManagerCreator$SharedEntityManagerInvocationHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.persistenceunit",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.persistenceunit.DefaultPersistenceUnitManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.orm.jpa.persistenceunit.PersistenceUnitReader",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.annotation.AnnotationAsyncExecutionInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.annotation.AsyncAnnotationBeanPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.concurrent",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.support.TaskUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.scheduling.support.TaskUtils$LoggingErrorHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.annotation.SecuredAnnotationSecurityMetadataSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.expression",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.expression.DenyAllPermissionEvaluator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.expression.method",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.expression.method.ExpressionBasedPostInvocationAdvice",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.intercept",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.intercept.AfterInvocationProviderManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.intercept.aopalliance",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.intercept.aopalliance.MethodSecurityInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.method",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.method.DelegatingMethodSecurityMetadataSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.prepost",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.prepost.PostInvocationAdviceProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.prepost.PreInvocationAuthorizationAdviceVoter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.prepost.PrePostAnnotationSecurityMetadataSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.vote",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.access.vote.AffirmativeBased",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication.AccountStatusUserDetailsChecker",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication.DefaultAuthenticationEventPublisher",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication.ProviderManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication.dao",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.authentication.dao.DaoAuthenticationProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.builders",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.configuration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration$DefaultPasswordEncoderAuthenticationManagerBuilder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration$EnableGlobalAuthenticationAutowiredConfigurer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.configuration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.configuration.AutowireBeanFactoryObjectPostProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.method",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.method.configuration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.builders",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.builders.HttpSecurity",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.builders.WebSecurity",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.configuration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter$2",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter$DefaultPasswordEncoderAuthenticationManagerBuilder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.core",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.core.SpringSecurityMessageSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.core.userdetails",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.core.userdetails.User",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.argon2",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.argon2.Argon2PasswordEncoder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.bcrypt",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.scrypt",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.crypto.scrypt.SCryptPasswordEncoder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation.web.configuration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration$1",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration$AuthorizationServerTokenServicesFactoryBean",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.http",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.http.converter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.http.converter.jaxb",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.http.converter.jaxb.JaxbOAuth2ExceptionMessageConverter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.approval",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.approval.ApprovalStoreUserApprovalHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.authentication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationProcessingFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.client",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.client.ClientCredentialsTokenEndpointFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.client.ClientCredentialsTokenGranter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.client.JdbcClientDetailsService",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.code",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.code.AuthorizationCodeTokenGranter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.endpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.endpoint.AuthorizationEndpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.endpoint.CheckTokenEndpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.endpoint.FrameworkEndpointHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.endpoint.TokenEndpoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.error",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.error.DefaultOAuth2ExceptionRenderer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.error.OAuth2AuthenticationEntryPoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.implicit",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.implicit.ImplicitTokenGranter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.password",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.password.ResourceOwnerPasswordTokenGranter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.refresh",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.oauth2.provider.refresh.RefreshTokenGranter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.DefaultRedirectStrategy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.DefaultSecurityFilterChain",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.FilterChainProxy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.AccessDeniedHandlerImpl",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.DefaultWebInvocationPrivilegeEvaluator",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.ExceptionTranslationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.expression",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.expression.ExpressionBasedFilterInvocationSecurityMetadataSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.expression.WebExpressionVoter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.intercept",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.access.intercept.FilterSecurityInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.AnonymousAuthenticationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.logout",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.logout.LogoutFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.preauth",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.session",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.session.ChangeSessionIdAuthenticationStrategy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.ui",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.ui.DefaultLoginPageGeneratingFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.ui.DefaultLogoutPageGeneratingFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.www",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.authentication.www.BasicAuthenticationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context.HttpSessionSecurityContextRepository",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context.SecurityContextPersistenceFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context.request",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context.request.async",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.csrf",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.csrf.CsrfAuthenticationStrategy",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.csrf.CsrfFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.header",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.header.HeaderWriterFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.header.writers",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.header.writers.HstsHeaderWriter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.savedrequest",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.savedrequest.HttpSessionRequestCache",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.savedrequest.RequestCacheAwareFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.servletapi",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.servletapi.HttpServlet3RequestFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.session",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.session.DisableEncodeUrlFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.session.ForceEagerSessionCreationFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.session.SessionManagementFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.util",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.util.matcher",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.util.matcher.AndRequestMatcher",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.util.matcher.MediaTypeRequestMatcher",
    "level": "WARN"
  },
  {
    "name": "org.springframework.security.web.util.matcher.NegatedRequestMatcher",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.hazelcast",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.hazelcast.Hazelcast4IndexedSessionRepository",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.security",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.security.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.security.web.authentication",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.security.web.authentication.SpringSessionRememberMeServices",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web.http",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web.http.DefaultCookieSerializer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web.http.HttpSessionAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web.http.SessionRepositoryFilter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.session.web.http.SessionRepositoryFilter.SESSION_LOGGER",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.annotation.AnnotationTransactionAttributeSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.interceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.interceptor.TransactionInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.support.TransactionSynchronizationUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.transaction.support.TransactionTemplate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.ui",
    "level": "WARN"
  },
  {
    "name": "org.springframework.ui.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.ui.context.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.ui.context.support.ResourceBundleThemeSource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.ui.context.support.UiApplicationContextUtils",
    "level": "WARN"
  },
  {
    "name": "org.springframework.util",
    "level": "WARN"
  },
  {
    "name": "org.springframework.util.PropertyPlaceholderHelper",
    "level": "WARN"
  },
  {
    "name": "org.springframework.validation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.validation.DataBinder",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.HttpLogging",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.client",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.client.RestTemplate",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.request",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.request.async",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.request.async.WebAsyncManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.support.ServletContextPropertySource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.support.ServletContextResourcePatternResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.context.support.StandardServletEnvironment",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.cors",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.cors.DefaultCorsProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.method",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.method.HandlerMethod",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.method.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.method.annotation.ModelFactory",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.DispatcherServlet",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.HandlerExecutionChain",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.PageNotFound",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.config",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.config.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.config.annotation.WebMvcConfigurer",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.function",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.function.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.function.support.HandlerFunctionAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.function.support.RouterFunctionMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.handler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.handler.SimpleUrlHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.i18n",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.i18n.LocaleChangeInterceptor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.ParameterizableViewController",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.annotation.ResponseStatusExceptionResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.HttpEntityMethodProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.ReactiveTypeHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.RequestPartMethodArgumentResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.method.annotation.ServletModelAttributeMethodProcessor",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.resource",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.resource.PathResourceResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.resource.ResourceHttpRequestHandler",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.resource.ResourceUrlProvider",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.support",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.support.SessionFlashMapManager",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.view",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.view.ContentNegotiatingViewResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.view.InternalResourceView",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.servlet.view.InternalResourceViewResolver",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.util",
    "level": "WARN"
  },
  {
    "name": "org.springframework.web.util.UrlPathHelper",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine.CONFIG",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine.TIMER",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine.cache",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine.cache.EXPRESSION_CACHE",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.TemplateEngine.cache.TEMPLATE_CACHE",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.engine",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.engine.ProcessorTemplateHandler",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.engine.TemplateManager",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.linkbuilder",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.linkbuilder.AbstractLinkBuilder",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.messageresolver",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.messageresolver.AbstractMessageResolver",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.expression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.expression.SPELContextPropertyAccessor",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.expression.SPELVariableExpressionEvaluator",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.messageresolver",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.messageresolver.SpringMessageResolver",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.view",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.spring5.view.ThymeleafViewResolver",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.AdditionExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.AndExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.BooleanTokenExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.ConditionalExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.DefaultExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.GenericTokenExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.LinkExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.MessageExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.NegationExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.NoOpTokenExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.NullTokenExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.NumberTokenExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.OrExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.TextLiteralExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.expression.VariableExpression",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.processor",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.processor.AbstractStandardFragmentInsertionTagProcessor",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.processor.StandardCaseTagProcessor",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.processor.StandardIncludeTagProcessor",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.serializer",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.standard.serializer.StandardJavaScriptSerializer",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.templatemode",
    "level": "WARN"
  },
  {
    "name": "org.thymeleaf.templatemode.TemplateMode",
    "level": "WARN"
  },
  {
    "name": "org.xnio",
    "level": "WARN"
  },
  {
    "name": "org.xnio.StreamConnection",
    "level": "WARN"
  },
  {
    "name": "org.xnio.future",
    "level": "WARN"
  },
  {
    "name": "org.xnio.listener",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.selector",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.socket",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.tcp",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.tcp.server",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.tcp.server.connection-limit",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.udp",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.udp.server",
    "level": "WARN"
  },
  {
    "name": "org.xnio.nio.udp.server.channel",
    "level": "WARN"
  },
  {
    "name": "org.xnio.option",
    "level": "WARN"
  },
  {
    "name": "org.xnio.option.parse",
    "level": "WARN"
  },
  {
    "name": "org.xnio.safe-close",
    "level": "WARN"
  },
  {
    "name": "sun",
    "level": "WARN"
  },
  {
    "name": "sun.rmi",
    "level": "WARN"
  },
  {
    "name": "sun.rmi.transport",
    "level": "WARN"
  },
  {
    "name": "tech",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.async",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.async.ExceptionHandlingAsyncTaskExecutor",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.config",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.config.locale",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.config.locale.AngularCookieLocaleResolver",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.config.metric",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.config.metric.JHipsterMetricsEndpoint",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.security",
    "level": "WARN"
  },
  {
    "name": "tech.jhipster.security.AjaxLogoutSuccessHandler",
    "level": "WARN"
  }
  ]
