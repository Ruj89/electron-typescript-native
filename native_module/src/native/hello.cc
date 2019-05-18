#include <nan.h>

NAN_METHOD(hello) {
    info.GetReturnValue().Set(Nan::New("world").ToLocalChecked());
}

using v8::FunctionTemplate;

NAN_MODULE_INIT(Init) {
    Nan::Set(target, Nan::New("hello").ToLocalChecked(),
        Nan::GetFunction(Nan::New<FunctionTemplate>(hello)).ToLocalChecked());
}

NODE_MODULE(hello, Init)