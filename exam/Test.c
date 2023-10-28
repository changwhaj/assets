void print_menu()
{
   printf("--------------------------------\n");
   printf("0: Print data and buffer\n"); 
   printf("1: Enter data (0~99, inclusive)\n");
   printf("2: Store data\n");
   printf("3: Restore data from buffer\n");
   printf("4: Sum\n");
   printf("5: Average\n");
   printf("6: Partial Sums\n");
   printf("7: Partial Average\n");
   printf("8: Difference from the average\n"); 
   printf("9: Filter\n"); 
   printf("10: Reverse\n"); 
   printf("11: Segment move\n"); 
   printf("12: Swap with buffer\n"); 
   printf("13: Compare average and store max\n"); 
   printf("100: Terminate\n");
   printf("--------------------------------\n");
   printf("Enter a command number: ");
}

int main()
{
   // You can modify the skeleton code if needed.
   int n;
      printf("Enter the number of elements: ");
   scanf("%d", &n);
   int data[n], menu=0;
   int buffer[n];
   for(int i=0; i<n; i++){
      buffer[i]=0;
      data[i]=0;
   }
   
   while(menu != 100) {
      print_menu();
      scanf("%d", &menu);
      if(menu==0){
         printf("data  :");
         for(int i=0; i<n; i++){
            printf(" %d", data[i]);
         }
         printf("\n");
         printf("buffer:");
         for(int i=0; i<n; i++){
            printf(" %d", buffer[i]);
         }
         printf("\n");
      }
      else if(menu==1){
         printf("Enter %d data: ", n);
         for(int i=0; i<n; i=i+1){
            scanf("%d ", &data[i]);
         }
      }
      else if(menu==2){
         for(int i=0; i<n; i++){
            buffer[i]=data[i];
         }
      }
      else if(menu==3){
         for(int i=0; i<n; i++){
            data[i]=buffer[i];
         }
      }
      else if(menu==4){
         int Sum=0;
         for(int i=0; i<n; i++){
            Sum = Sum + data[i];
            data[i]=0;
         }
         data[0]=Sum;
      }
      else if(menu==5){
         int Sum=0;
         for(int i=0; i<n; i++){
            Sum = Sum + data[i];
            data[i]=0;
         }
         data[0]=Sum/n;
      }
      else if(menu==6){
         printf("Enter a range: ");
         int r;
         scanf("%d",&r);
         for(int i=0; i<n-2; i++){
            int s=0;
            for(int a=i; a<i+r; a++){
               s= s + data[a];
            }
            data[i]=s;
         }
         for(int i=n-1; i>n-r; i--){
            data[i]=0;
         }
      }
      else if(menu==7){
         printf("Enter a range: ");
         int r;
         scanf("%d", &r);
         for(int i=0; i<n-2; i++){
            int s=0;
            for(int a=i; a<i+r; a++){
               s= s + data[a];
            }
            data[i]=s/r;
         }
         for(int i=n-1; i>n-r; i--){
            data[i]=0;
         }
      }
      else if(menu==8){
         int Sum=0;
         for(int i=0; i<n; i++){
            Sum = Sum + data[i];
         }
         int A=Sum/n;
         for(int i=0; i<n; i++){
            if(A>data[i]){
               data[i]=A - data[i];
            }
            else{
               data[i]= data[i]-A;
            }
         }
      }
      else if(menu==9){
         
      }
      else if(menu==10){
         
      }
      else if(menu==11){
         
      }
      else if(menu==12){
         
      }
      else if(menu==13){
         
      }
   }
   return 0;
}