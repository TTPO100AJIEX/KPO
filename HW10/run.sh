cd src
javac **/*.java -d ../vm
cd ../
java -classpath vm multithreading/Test