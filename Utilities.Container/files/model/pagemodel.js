window.pagemodel = [
  {
    "name": "BitContainer",
    "description": "Handle boolean data",
    "methods": [
      {
        "name": "void Add(bool data)",
        "description": "Add a boolean data"
      },
      {
        "name": "void AddArray(IEnumerable<bool> data)",
        "description": "Add an array of boolean data"
      },
      {
        "name": "bool? Read()",
        "description": "Read a boolean data"
      },
      {
        "name": "bool? Scan()",
        "description": "Scan a boolean data"
      },
      {
        "name": "bool?[] ReadArray(int length)",
        "description": "Read a boolean array"
      },
      {
        "name": "void ReadReset()",
        "description": "Reset read flag"
      },
      {
        "name": "void Clear()",
        "description": "Empty container"
      },
      {
        "name": "IEnumerable<byte> Export()",
        "description": "Export data from container"
      },
      {
        "name": "int Import(byte[] buffer, int start = 0)",
        "description": "Import data into container"
      }
    ]
  },
  {
    "name": "ByteContainer",
    "description": "Process byte data",
    "methods": [
      {
        "name": "void AddItem(byte data)",
        "description": "Add a byte data"
      },
      {
        "name": "void AddItems(byte[] data)",
        "description": "Add a byte data list"
      },
      {
        "name": "void AddArray(IEnumerable<byte> data)",
        "description": "Add an array of data"
      },
      {
        "name": "bytes? ReadItem()",
        "description": "Read a byte data"
      },
      {
        "name": "byte[] ReadItems(int length)",
        "description": "Read multiple byte data"
      },
      {
        "name": "byte[] ScanItems(int length)",
        "description": "Scan multiple byte data"
      },
      {
        "name": "(int, IEnumerable<byte>?) ReadArray()",
        "description": "Read an array of data"
      },
      {
        "name": "void ReadReset()",
        "description": "Reset reading information"
      },
      {
        "name": "void Clear()",
        "description": "Empty container"
      },
      {
        "name": "IEnumerable<byte> Export()",
        "description": "Export data from container"
      },
      {
        "name": "int Import(byte[] buffer, int start = 0)",
        "description": "Import data into container"
      }
    ]
  },
  {
    "name": "DataContainer",
    "description": "Data processing",
    "methods": [
      {
        "name": "void AddLength(int data)",
        "description": "Write a byte or integer size"
      },
      {
        "name": "int ReadLength()",
        "description": "Read a byte or integer size"
      },
      {
        "name": "int ScanLength()",
        "description": "Prescan size is a byte or integer"
      },
      {
        "name": "void AddBoolean(bool data)",
        "description": "Write a boolean value"
      },
      {
        "name": "bool? ReadBoolean()",
        "description": "Read a boolean value"
      },
      {
        "name": "void AddBooleanArray(IEnumerable<bool> data)",
        "description": "Write a list of boolean values"
      },
      {
        "name": "IEnumerable<bool?> ReadBooleanArray(int length)",
        "description": "Read a list of boolean values"
      },
      {
        "name": "void AddArray(IEnumerable<byte> data)",
        "description": "Write an array of data"
      },
      {
        "name": "(int, IEnumerable<byte>?) ReadArray()",
        "description": "Read an array of data"
      }
    ]
  },
  {
    "name": "DataBinding",
    "description": "Read and write class members",
    "methods": [
      {
        "name": "byte[]? ReadMembers<T>(T item) where T : class",
        "description": "Read item attributes"
      },
      {
        "name": "void WriteMembers<T>(T item, byte[]? data) where T : class",
        "description": "Write the item's attributes in data"
      }
    ]
  },
  {
    "name": "DataConvert",
    "description": "Read and write a data type",
    "methods": [
      {
        "name": "byte[]? GetBytes<T>(T? data)",
        "description": "Get bytes data from data"
      },
      {
        "name": "T? GetItem<T>(byte[]? data)",
        "description": "Get value from data"
      }
    ]
  },
  {
    "name": "RollbackItem",
    "description": "Rollback an object",
    "methods": [
      {
        "name": "void Commit()",
        "description": "Save current state"
      },
      {
        "name": "bool Rollback()",
        "description": "Return to previous state"
      }
    ]
  },
  {
    "name": "UndoRedoItem",
    "description": "Undo and redo an object",
    "methods": [
      {
        "name": "void Commit()",
        "description": "Save current state"
      },
      {
        "name": "void Latest()",
        "description": "Return to latest status"
      },
      {
        "name": "bool Undo()",
        "description": "Return to previous state"
      },
      {
        "name": "bool Redo()",
        "description": "Return to the previous state"
      }
    ]
  },
  {
    "name": "Autosave",
    "description": "Auto-save data",
    "methods": [
      {
        "name": "bool Create<T>(string key, Func<T?> getValue, int timeInterval = 10, int numberOfBackup = 1)",
        "description": "Add a data backup stream"
      },
      {
        "name": "T? Get<T>(string key, int reverseIndex = 0)",
        "description": "Get a copy of the data"
      },
      {
        "name": "T? Get<T>(string key, long timestamp, int reverseIndex = 0)",
        "description": "Get a copy of the data before the time"
      },
      {
        "name": "void Stop(string key)",
        "description": "Stop a backup stream"
      }
    ]
  },
  {
    "name": "Backup",
    "description": "Collection of data archives",
    "methods": [
      {
        "name": "bool Setup(string key, int numberOfBackup)",
        "description": "Create a data archive"
      },
      {
        "name": "bool Add<T>(string key, T value)",
        "description": "Add data to archive"
      },
      {
        "name": "bool Import(string key, byte[] data)",
        "description": "Add data as a backup record"
      },
      {
        "name": "byte[]? Export(string key, int reverseIndex = 0)",
        "description": "Get a backup record"
      },
      {
        "name": "byte[]? Export(string key, long timestamp, int reverseIndex = 0)",
        "description": "Get a previous backup record"
      },
      {
        "name": "T? Get<T>(string key, int reverseIndex = 0)",
        "description": "Gets an archive as a class"
      },
      {
        "name": "T? Get<T>(string key, long timestamp, int reverseIndex = 0)",
        "description": "Get an archive of a class before the time"
      }
    ]
  }
]