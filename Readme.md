GO go build -o hellowroldWS -ldflags="-s -w" hellowrold.go
RUST rustc helloworld.rs / cargo build --release
C gcc -o hellowrld hellowrld.c
C++ g++ hellworld.cpp -o hellworld
Lua
Python
Nim nim c -r --verbosity:0 helloworld.nim
C# dotnet new console --framework net5.0 / dotnet run / dotnet publish --configuration Release
Java javac helloworld.java / java HelloWorld
Kotlin kotlinc helloworld.kt -include-runtime -d hello.jar / java -jar hello.jar
Assembler gcc -nostdlib -no-pie helloworld.s -o helloworld / gcc -c helloworld.s && ld helloworld.o $$ ./a.out
NodeJS node app.js