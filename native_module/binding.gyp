{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "src/native/hello.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}