let code = "static uint16_t x, y;\n" +
    "extern Globals globals;\n" +
    "\n" +
    "void createSpace(unsigned char num, unsigned int size){\n" +
    "\tx = 10+((num%2)*120);\n" +
    "\ty = 60+((num/2)*60);\n" +
    "\ttft.setSize(2);\n" +
    "\ttft.fillSquircle(x,y,100,40,2,size>0?DGREEN:RED);\n" +
    "\ttft.print(x+2,y+2,\"Program\",WHITE,WHITE);\n" +
    "\ttft.print(x+86,y+2,num+1,10,WHITE,WHITE,0);\n" +
    "\tif(size>0) tft.print(x+2,y+22,(int)size,10,WHITE,WHITE,0);\n" +
    "\telse tft.print(x+2,y+22,\"Empty\",WHITE,WHITE);\n" +
    "}\n" +
    "\n" +
    "void addSetup(unsigned int *addresses, unsigned int *sizes){\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(10,10,\" Back \",WHITE,BLACK);\n" +
    "\tfor(unsigned char i=0; i<spaces; i++) {\n" +
    "\t\taddresses[i] = eeprom.readByte(ROM,ADDRESS_HIGH+(i*0x008));\n" +
    "\t\taddresses[i] <<= 8;\n" +
    "\t\taddresses[i] |= eeprom.readByte(ROM,ADDRESS_LOW+(i*0x008));\n" +
    "\t\tsizes[i] = eeprom.readByte(ROM,SIZE_HIGH+(i*0x008));\n" +
    "\t\tsizes[i] <<= 8;\n" +
    "\t\tsizes[i] |= eeprom.readByte(ROM,SIZE_LOW+(i*0x008));\n" +
    "\t}\n" +
    "\tfor(unsigned char i=0; i<spaces; i++) createSpace(i,sizes[i]);\n" +
    "}\n" +
    "\n" +
    "void modifySetup(unsigned int *addresses, unsigned int *sizes){\n" +
    "\ttft.fillScreen(WHITE);\n" +
    "\taddSetup(addresses,sizes);\n" +
    "}\n" +
    "\n" +
    "void selectShuttle(unsigned char current){\n" +
    "\ttft.setSize(2);\n" +
    "\tif(current == 0){\n" +
    "\t\ttft.fillCircle(165,190,10,RED,15);\n" +
    "\t\ttft.print(160,183,1,10,WHITE,WHITE,0);\n" +
    "\t\t} else {\n" +
    "\t\ttft.fillCircle(165,190,10,WHITE,15);\n" +
    "\t\ttft.drawCircle(165,190,10,BLACK,15);\n" +
    "\t\ttft.print(160,183,1,10,BLACK,BLACK,0);\n" +
    "\t}\n" +
    "\tif(current == 1){\n" +
    "\t\ttft.fillCircle(193,190,10,RED,15);\n" +
    "\t\ttft.print(188,183,2,10,WHITE,WHITE,0);\n" +
    "\t\t} else {\n" +
    "\t\ttft.fillCircle(193,190,10,WHITE,15);\n" +
    "\t\ttft.drawCircle(193,190,10,BLACK,15);\n" +
    "\t\ttft.print(188,183,2,10,BLACK,BLACK,0);\n" +
    "\t}\n" +
    "\tif(current == 2) {\n" +
    "\t\ttft.fillCircle(221,190,10,RED,15);\n" +
    "\t\ttft.print_word(216,183,'S',WHITE,WHITE);\n" +
    "\t\t} else {\n" +
    "\t\ttft.fillCircle(221,190,10,WHITE,15);\n" +
    "\t\ttft.drawCircle(221,190,10,BLACK,15);\n" +
    "\t\ttft.print_word(216,183,'S',BLACK,BLACK);\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void editEntry(unsigned int pick, unsigned char current){\n" +
    "\tchar size1[6];\n" +
    "\titoa(pick,size1,10);\n" +
    "\tunsigned char slen = 0;\n" +
    "\twhile(size1[++slen]);\n" +
    "\ttft.fillSquircle(20,175,126,30,5,GRAY);\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(86-(slen*9),178,size1,BLACK,BLACK);\n" +
    "\tselectShuttle(current);\n" +
    "}\n" +
    "\n" +
    "void programEditSetup(unsigned int size, unsigned int pick, unsigned char current){\n" +
    "\ttft.fillScreen(WHITE);\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(20,10,\" Back \",WHITE,BLACK);\n" +
    "\ttft.setSize(2);\n" +
    "\ttft.print(20,50,\"Program Size\",BLACK,BLACK);\n" +
    "\ttft.fillSquircle(20,70,126,30,5,GRAY);\n" +
    "\ttft.print(150,77,\"picks\",BLACK,BLACK);\n" +
    "\tchar size1[6];\n" +
    "\titoa(size,size1,10);\n" +
    "\tunsigned char slen = 0;\n" +
    "\twhile(size1[++slen]);\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(86-(slen*9),73,size1,BLACK,BLACK);\n" +
    "\n" +
    "\ttft.fillSquircle(20,270,162,30,5,GRAY);\n" +
    "\ttft.print(38,273,\"Preview\",BLACK,GRAY);\n" +
    "\n" +
    "\tfor(int i=0;i<32;i++){\n" +
    "\t\tfor(int j=15-(i/2);j<16;j++){\n" +
    "\t\t\ttft.drawPixel(70+j,130+i,BLACK);\n" +
    "\t\t\ttft.drawPixel(101-j,130+i,BLACK);\n" +
    "\t\t\ttft.drawPixel(70+j,250-i,BLACK);\n" +
    "\t\t\ttft.drawPixel(101-j,250-i,BLACK);\n" +
    "\t\t}\n" +
    "\t}\n" +
    "\teditEntry(pick,current);\n" +
    "}\n" +
    "\n" +
    "void putData(unsigned int address, unsigned int pick, unsigned char data){\n" +
    "\tunsigned char byt = pick/8;\n" +
    "\tunsigned char data1 = eeprom.readByte(ROM,address+byt);\n" +
    "\tdata <<= pick%8;\n" +
    "\tdata1 &= ~(3<<(pick%8));\n" +
    "\tWRITE_EN;\n" +
    "\teeprom.writeByte(ROM,address+byt,data1 | data);\n" +
    "\tWRITE_DIS;\n" +
    "}\n" +
    "\n" +
    "unsigned char fetchData(unsigned int address, unsigned int pick){\n" +
    "\tunsigned char byt = pick/8;\n" +
    "\tunsigned char data = eeprom.readByte(ROM,address+byt);\n" +
    "\treturn (data>>(pick%8))&3;\n" +
    "}\n" +
    "\n" +
    "void fillPreviewLine(unsigned char pos, uint16_t s, unsigned int pick, uint16_t color){\n" +
    "\tfor(int i = 0; i < 8; i++) tft.drawHLine(0,((pos*8)+i+s)%320,240,color);\n" +
    "\n" +
    "\tif(pick == 0){\n" +
    "\t\ttft.print(10,(pos*8+s)%320,\" BACK \",WHITE,BLACK);\n" +
    "\t\ttft.print_word(118,(pos*8+s)%320,(char) 0x0A,BLACK,BLACK);\n" +
    "\t} else if(pick == 1) tft.print_word(118,(pos*8+s)%320,(char) 0x09,BLACK,BLACK);\n" +
    "\telse tft.print(10,(pos*8+s)%320,(int) pick,10,BLACK,BLACK,0);\n" +
    "}\n" +
    "\n" +
    "void preview(unsigned int address, unsigned int size){\n" +
    "\t// preview section\n" +
    "\ttft.fillScreen(WHITE);\n" +
    "\ttft.setSize(1);\n" +
    "\tunsigned int pick = 1;\n" +
    "\tunsigned int top = 0;\n" +
    "\tuint16_t loc = 0x0000;\n" +
    "\tfillPreviewLine(0,0,0,WHITE);\n" +
    "\tfillPreviewLine(39,0,1,WHITE);\n" +
    "\tfor(;pick*2<=size && pick<=38;pick++){\n" +
    "\t\tuint16_t color = fetchData(address,pick*2)?RED:GREEN;\n" +
    "\t\tfillPreviewLine(pick-top,0,pick*2,color);\n" +
    "\t}\n" +
    "\twhile(1){\n" +
    "\t\tif(touch.isTouch()){\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(y<8){\n" +
    "\t\t\t\tif(x>10&&x<46){\n" +
    "\t\t\t\t\ttft.print_word(0,0,' ',BLACK,BLACK);\n" +
    "\t\t\t\t\ttft.vertScroll(loc,-loc);\n" +
    "\t\t\t\t\tbreak;\n" +
    "\t\t\t\t}\n" +
    "\t\t\t\tif(x>110&&x<130) {\n" +
    "\t\t\t\t\tif(top!=0){\n" +
    "\t\t\t\t\t\ttop --;\n" +
    "\t\t\t\t\t\tuint16_t color = fetchData(address,top*2+2)?RED:GREEN;\n" +
    "\t\t\t\t\t\tfillPreviewLine(39,loc,0,WHITE);\n" +
    "\t\t\t\t\t\tfillPreviewLine(38,loc,1,WHITE);\n" +
    "\t\t\t\t\t\tfillPreviewLine(0,loc,top*2+2,color);\n" +
    "\t\t\t\t\t\tloc = tft.vertScroll(loc, -8);\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t}\n" +
    "\t\t\t} else if(y>310&&x>110&&x<130) {\n" +
    "\t\t\t\tif((pick+top)*2<size){\n" +
    "\t\t\t\t\ttop++;\n" +
    "\t\t\t\t\tuint16_t color = fetchData(address,(pick+top)*2)?RED:GREEN;\n" +
    "\t\t\t\t\tfillPreviewLine(1,loc,0,WHITE);\n" +
    "\t\t\t\t\tfillPreviewLine(0,loc,1,WHITE);\n" +
    "\t\t\t\t\tfillPreviewLine(39,loc,(pick+top)*2,color);\n" +
    "\t\t\t\t\tloc = tft.vertScroll(loc, 8);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void programEdit(unsigned char prgmNum, unsigned int address, unsigned int size){\n" +
    "\tunsigned int pick = 2;\n" +
    "\tunsigned char current  = fetchData(address,pick);\n" +
    "\tprogramEditSetup(size,pick,current);\n" +
    "\twhile(1){\n" +
    "\t\tif(touch.isTouch()){\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(x>20 && x<128&& y>10&&y<44){\n" +
    "\t\t\t\tputData(address,pick,current);\n" +
    "\t\t\t\t_delay_ms(2000);\n" +
    "\t\t\t\tbreak;\n" +
    "\t\t\t\t} else if(x>20&&x<146&&y>270&&y<300){\n" +
    "\t\t\t\t\tpreview(address, size);\n" +
    "\t\t\t\t\tprogramEditSetup(size,pick,current);\n" +
    "\t\t\t\t} else if(y>175&&y<205){\n" +
    "\t\t\t\t\tif(x>20&&x<146){\n" +
    "\t\t\t\t\t\tunsigned int p = numpad(\"pick number: \",Integer,pick);\n" +
    "\t\t\t\t\t\tp += p%2;\n" +
    "\t\t\t\t\t\tif(p!=pick && p<=size){\n" +
    "\t\t\t\t\t\t\tputData(address,pick,current);\n" +
    "\t\t\t\t\t\t\tpick = p;\n" +
    "\t\t\t\t\t\t\tcurrent = fetchData(address,pick);\n" +
    "\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t\tprogramEditSetup(size,pick,current);\n" +
    "\t\t\t\t\t} else if(x>155&&x<176){\n" +
    "\t\t\t\t\tcurrent = 0;\n" +
    "\t\t\t\t\tselectShuttle(current);\n" +
    "\t\t\t\t\t} else if(x>183&&x<203){\n" +
    "\t\t\t\t\tcurrent = 1;\n" +
    "\t\t\t\t\tselectShuttle(current);\n" +
    "\t\t\t\t\t} else if(x>211&&x<231){\n" +
    "\t\t\t\t\tcurrent = 2;\n" +
    "\t\t\t\t\tselectShuttle(current);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t\t} else if(x>70&&x<100){\n" +
    "\t\t\t\tif(y>130&&y<162){\n" +
    "\t\t\t\t\tif(pick<size){\n" +
    "\t\t\t\t\t\tputData(address,pick,current);\n" +
    "\t\t\t\t\t\tpick+=2;\n" +
    "\t\t\t\t\t\tcurrent = fetchData(address,pick);\n" +
    "\t\t\t\t\t\teditEntry(pick,current);\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t\t} else if(y>218&&y<250){\n" +
    "\t\t\t\t\tif(pick>2){\n" +
    "\t\t\t\t\t\tputData(address,pick,current);\n" +
    "\t\t\t\t\t\tpick-=2;\n" +
    "\t\t\t\t\t\tcurrent = fetchData(address,pick);\n" +
    "\t\t\t\t\t\teditEntry(pick,current);\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void programAdd(unsigned char prgmNum, unsigned int address, unsigned int size){\n" +
    "\tif(size > 0){\n" +
    "\t\ttft.fillSquircle(11,41,218,78,9,WHITE);\n" +
    "\t\ttft.drawSquircle(10,40,220,80,10,BLACK);\n" +
    "\t\ttft.print(24,56,\"Delete Program ?\",BLACK,BLACK);\n" +
    "\t\ttft.print(192,56,prgmNum+1,10,BLACK,BLACK,0);\n" +
    "\t\ttft.print(18,88,\" Cancel   Delete \",BLACK,BLACK);\n" +
    "\t\twhile(1){\n" +
    "\t\t\tif(touch.isTouch()){\n" +
    "\t\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\t\tif(y>88&&y<104){\n" +
    "\t\t\t\t\tif(x>30&&x<102){\n" +
    "\t\t\t\t\t\ttft.fillRect(10,40,220,80,WHITE);\n" +
    "\t\t\t\t\t\tbreak;\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t\telse if(x>138&&x<210){\n" +
    "\t\t\t\t\t\tPORTD &= ~(1 << 7);\n" +
    "\t\t\t\t\t\teeprom.writeByte(ROM,SIZE_HIGH+(prgmNum*0x008),0x00);\n" +
    "\t\t\t\t\t\teeprom.writeByte(ROM,SIZE_LOW+(prgmNum*0x008),0x00);\n" +
    "\t\t\t\t\t\tPORTD |= 1 << 7;\n" +
    "\t\t\t\t\t\ttft.fillRect(10,40,220,80,WHITE);\n" +
    "\t\t\t\t\t\tbreak;\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t\t} else {\n" +
    "\t\tsize = numpad(\"number of picks: \",Integer,0);\n" +
    "\t\tsize += size%2;\n" +
    "\t\tchar shuttle = 0;\n" +
    "\t\tif(size > 0){\n" +
    "\t\t\ttft.setSize(2);\n" +
    "\t\t\ttft.fillSquircle(11,41,218,111,9,WHITE);\n" +
    "\t\t\ttft.drawSquircle(10,40,220,112,10,BLACK);\n" +
    "\t\t\ttft.print(24,56,\"Default Shuttle:\",BLACK,BLACK);\n" +
    "\t\t\ttft.print(60,89,1,10,BLACK,BLACK,0);\n" +
    "\t\t\ttft.drawCircle(65,96,10,BLACK,15);\n" +
    "\t\t\ttft.print(170,89,2,10,BLACK,BLACK,0);\n" +
    "\t\t\ttft.drawCircle(175,96,10,BLACK,15);\n" +
    "\t\t\ttft.print(18,120,\" Cancel     OK   \",BLACK,BLACK);\n" +
    "\t\t\twhile(1){\n" +
    "\t\t\t\tif(touch.isTouch()){\n" +
    "\t\t\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\t\t\tif(y>86&&y<106){\n" +
    "\t\t\t\t\t\tif(x>55&&x<75){\n" +
    "\t\t\t\t\t\t\tif(shuttle == 2){\n" +
    "\t\t\t\t\t\t\t\ttft.fillCircle(175,96,10,WHITE,15);\n" +
    "\t\t\t\t\t\t\t\ttft.print(170,89,2,10,BLACK,BLACK,0);\n" +
    "\t\t\t\t\t\t\t\ttft.drawCircle(175,96,10,BLACK,15);\n" +
    "\t\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t\t\ttft.fillCircle(65,96,10,RED,15);\n" +
    "\t\t\t\t\t\t\ttft.print(60,89,1,10,WHITE,WHITE,0);\n" +
    "\t\t\t\t\t\t\tshuttle = 1;\n" +
    "\t\t\t\t\t\t\t} else if(x>165&&x<185) {\n" +
    "\t\t\t\t\t\t\tif(shuttle == 1){\n" +
    "\t\t\t\t\t\t\t\ttft.fillCircle(65,96,10,WHITE,15);\n" +
    "\t\t\t\t\t\t\t\ttft.print(60,89,1,10,BLACK,BLACK,0);\n" +
    "\t\t\t\t\t\t\t\ttft.drawCircle(65,96,10,BLACK,15);\n" +
    "\t\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t\t\ttft.fillCircle(175,96,10,RED,15);\n" +
    "\t\t\t\t\t\t\ttft.print(170,89,2,10,WHITE,WHITE,0);\n" +
    "\t\t\t\t\t\t\tshuttle = 2;\n" +
    "\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t\t} else if(y>120&&y<136){\n" +
    "\t\t\t\t\t\tif(x>30&&x<102){\n" +
    "\t\t\t\t\t\t\tshuttle = 0;\n" +
    "\t\t\t\t\t\t\tbreak;\n" +
    "\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t\telse if(x>160&&x<190){\n" +
    "\t\t\t\t\t\t\tbreak;\n" +
    "\t\t\t\t\t\t}\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t\tif(size > 0 && shuttle > 0){\n" +
    "\t\t\tWRITE_EN;\n" +
    "\t\t\teeprom.writeByte(ROM,SIZE_HIGH+(prgmNum*0x008),(unsigned char)(size>>8));\n" +
    "\t\t\teeprom.writeByte(ROM,SIZE_LOW+(prgmNum*0x008),(unsigned char)size);\n" +
    "\t\t\teeprom.writeByte(ROM,DEFAULT+(prgmNum*0x008),shuttle);\n" +
    "\t\t\tWRITE_DIS;\n" +
    "\t\t\tint pages = (size)/(4*MTYPE);\n" +
    "\t\t\tunsigned char block[MTYPE];\n" +
    "\t\t\tfor(int i=0;i<MTYPE;i++) block[i] = (unsigned char)(0x55 * (shuttle-1));\n" +
    "\t\t\tWRITE_EN;\n" +
    "\t\t\tfor(int i=0;i<=pages;i++) eeprom.writePage(ROM,address+(i*MTYPE),MTYPE,block);\n" +
    "\t\t\tWRITE_DIS;\n" +
    "\t\t\tprogramEdit(prgmNum,address,size);\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void add_delete()\n" +
    "{\n" +
    "\tunsigned int addresses[spaces],sizes[spaces];\n" +
    "\tmodifySetup(addresses,sizes);\n" +
    "\twhile(1){\n" +
    "\t\tif(touch.isTouch()) {\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(x>10&&x<118&&y>10&&y<34) break;\n" +
    "\t\t\tif(x>10&&x<110){\n" +
    "\t\t\t\tif(y>60&&y<100&&spaces>0) {\n" +
    "\t\t\t\tprogramAdd(0,addresses[0],sizes[0]);\n" +
    "\t\t\t\tsizes[0]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&spaces>2) {\n" +
    "\t\t\t\tprogramAdd(2,addresses[2],sizes[2]);\n" +
    "\t\t\t\tsizes[2]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220&&spaces>4) {\n" +
    "\t\t\t\tprogramAdd(4,addresses[4],sizes[4]);\n" +
    "\t\t\t\tsizes[4]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280&&spaces>6) {\n" +
    "\t\t\t\tprogramAdd(6,addresses[6],sizes[6]);\n" +
    "\t\t\t\tsizes[6]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t} else if (x>130&&x<230) {\n" +
    "\t\t\tif(y>60&&y<100&&spaces>1) {\n" +
    "\t\t\t\tprogramAdd(1,addresses[1],sizes[1]);\n" +
    "\t\t\t\tsizes[1]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&spaces>3) {\n" +
    "\t\t\t\tprogramAdd(3,addresses[3],sizes[3]);\n" +
    "\t\t\t\tsizes[3]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220&&spaces>5) {\n" +
    "\t\t\t\tprogramAdd(5,addresses[5],sizes[5]);\n" +
    "\t\t\t\tsizes[5]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280&&spaces>7) {\n" +
    "\t\t\t\tprogramAdd(7,addresses[7],sizes[7]);\n" +
    "\t\t\t\tsizes[7]>0?addSetup(addresses,sizes):modifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void modify()\n" +
    "{\n" +
    "\tunsigned int addresses[spaces],sizes[spaces];\n" +
    "\tmodifySetup(addresses,sizes);\n" +
    "\twhile(1){\n" +
    "\t\tif(touch.isTouch()) {\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(x>10&&x<118&&y>10&&y<34) break;\n" +
    "\t\t\tif(x>10&&x<110){\n" +
    "\t\t\t\tif(y>60&&y<100&&sizes[0]>0) {\n" +
    "\t\t\t\tprogramEdit(0,addresses[0],sizes[0]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&sizes[2]>0) {\n" +
    "\t\t\t\tprogramEdit(2,addresses[2],sizes[2]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220&&sizes[4]>0) {\n" +
    "\t\t\t\tprogramEdit(4,addresses[4],sizes[4]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280&&sizes[6]>0) {\n" +
    "\t\t\t\tprogramEdit(6,addresses[6],sizes[6]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t} else if (x>130&&x<230&&sizes[1]>0) {\n" +
    "\t\t\t\tif(y>60&&y<100) {\n" +
    "\t\t\t\tprogramEdit(1,addresses[1],sizes[1]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&sizes[2]>0) {\n" +
    "\t\t\t\tprogramEdit(3,addresses[3],sizes[3]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220) {\n" +
    "\t\t\t\tprogramEdit(5,addresses[5],sizes[5]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280) {\n" +
    "\t\t\t\tprogramEdit(7,addresses[7],sizes[7]);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "unsigned char setRunStatus(unsigned int pick,unsigned int address, unsigned char prev){\n" +
    "\tunsigned char current = fetchData(address,pick+2);\n" +
    "\tunsigned char tmp = current%2;\n" +
    "\tif(prev != tmp) OUT1_ON;\n" +
    "\telse OUT1_OFF;\n" +
    "\tprev = tmp;\n" +
    "\ttft.print(20,124,(int)pick,10,BLACK,GRAY,1);\n" +
    "\ttft.print(120,188,current+1,10,BLACK,WHITE,0);\n" +
    "\ttft.print(20,264,(float)globals.rpm1,2,BLACK,GRAY,2);\n" +
    "\treturn prev;\n" +
    "}\n" +
    "\n" +
    "void programRunSetup(){\n" +
    "\ttft.fillScreen(WHITE);\n" +
    "\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(10,10,\" EXIT \",WHITE,BLACK);\n" +
    "\ttft.print(122,10,\" STOP \",WHITE,RED);\n" +
    "\n" +
    "\ttft.fillRect(0,120,240,40,GRAY);\n" +
    "\ttft.fillCircle(175,140,15,GREEN,15);\n" +
    "\ttft.print_word(168,130,'+',WHITE,WHITE);\n" +
    "\ttft.fillCircle(215,140,15,RED,15);\n" +
    "\ttft.print_word(208,130,'-',WHITE,WHITE);\n" +
    "\ttft.fillRect(0,260,240,40,GRAY);\n" +
    "\n" +
    "\ttft.setSize(2);\n" +
    "\ttft.print(20,64,\"Count:\",BLACK,BLACK);\n" +
    "\ttft.print(20,100,\"Pick:\",BLACK,BLACK);\n" +
    "\ttft.print(20,204,\"Shuttle:\",BLACK,BLACK);\n" +
    "\ttft.print(20,240,\"RPM:\",BLACK,BLACK);\n" +
    "}\n" +
    "\n" +
    "unsigned char restartRun(){\n" +
    "\ttft.setSize(2);\n" +
    "\ttft.fillSquircle(10,40,220,70,10,WHITE);\n" +
    "\ttft.drawSquircle(10,40,220,70,10,BLACK);\n" +
    "\ttft.print(12,51,\" Restart process? \",BLACK,BLACK);\n" +
    "\ttft.print(12,83,\"  EXIT   RESTART  \",BLACK,BLACK);\n" +
    "\ttft.setSize(4);\n" +
    "\tuint16_t c = globals.count1;\n" +
    "\twhile(1){\n" +
    "\t\tif(c != globals.count1){\n" +
    "\t\t\tSTOP_MACHINE;\n" +
    "\t\t\tc = globals.count1;\n" +
    "\t\t}\n" +
    "\t\tif(touch.isTouch()){\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(y>40&&y<80){\n" +
    "\t\t\t\tif(x>48&&x<96) return 0;\n" +
    "\t\t\t\telse if(x>120&&x<204) return 1;\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "\treturn 0;\n" +
    "}\n" +
    "\n" +
    "void storeSelectorBackup(unsigned char progNum, unsigned int repeat_count) {\n" +
    "\tunsigned char arr[4];\n" +
    "\tarr[0] = globals.mode;\n" +
    "\tarr[1] = progNum;\n" +
    "\tarr[2] = (unsigned char)(repeat_count>>8);\n" +
    "\tarr[3] = (unsigned char)repeat_count;\n" +
    "\tWRITE_EN;\n" +
    "\teeprom.writePage(ROM,BACKUP,4,arr);\n" +
    "\tWRITE_DIS;\n" +
    "}\n" +
    "\n" +
    "void storeIntBackup(unsigned int val, unsigned char location){\n" +
    "\tWRITE_EN;\n" +
    "\teeprom.writeByte(ROM,BACKUP_VOLATILE+location,(unsigned char)(val>>8));\n" +
    "\teeprom.writeByte(ROM,BACKUP_VOLATILE+location+1,(unsigned char)val);\n" +
    "\tWRITE_DIS;\n" +
    "}\n" +
    "\n" +
    "void programRun(unsigned char progNum, unsigned int address, unsigned int size, unsigned char runType)\n" +
    "{\n" +
    "\tunsigned int pick = 0;\n" +
    "\tunsigned int repeat = 0,repeat_count = 0;\n" +
    "\n" +
    "\tif(runType){\n" +
    "\t\tunsigned char arr[4];\n" +
    "\t\teeprom.readPage(ROM,BACKUP,4,arr);\n" +
    "\t\trepeat_count = ((int)arr[2]<<8);\n" +
    "\t\trepeat_count |= arr[3];\n" +
    "\t\teeprom.readPage(ROM,BACKUP_VOLATILE,4,arr);\n" +
    "\t\trepeat = ((int)arr[2]<<8);\n" +
    "\t\trepeat |= arr[3];\n" +
    "\t\tglobals.count1 = ((int)arr[0]<<8);\n" +
    "\t\tglobals.count1 |= arr[1];\n" +
    "\t} else {\n" +
    "\t\trepeat_count = numpad(\"Pattern repeat: \",Integer,0);\n" +
    "\t\tglobals.count1= 0;\n" +
    "\t}\n" +
    "\n" +
    "\tprogramRunSetup();\n" +
    "\n" +
    "\tTCNT1 = 0x0000;\n" +
    "\tTCCR1B|= 5<<CS10;\n" +
    "\tGICR |= 0xA0;\n" +
    "\n" +
    "\tunsigned char prev = 0;\n" +
    "\n" +
    "\tstoreSelectorBackup(progNum,repeat_count);\n" +
    "\twhile(repeat < repeat_count){\n" +
    "\t\ttft.setSize(3);\n" +
    "\t\ttft.print(120,56,(int)repeat,10,BLACK,WHITE,1);\n" +
    "\n" +
    "\t\tstoreIntBackup(repeat,2);\n" +
    "\t\tif(runType) runType = 0;\n" +
    "\t\telse globals.count1 = 0;\n" +
    "\t\tpick = globals.count1;\n" +
    "\t\ttft.setSize(4);\n" +
    "\t\tprev = setRunStatus(pick,address,prev);\n" +
    "\n" +
    "\t\twhile(1){\n" +
    "\t\t\tif(globals.count1 != pick){\n" +
    "\t\t\t\tpick = globals.count1;\n" +
    "\t\t\t\tif(pick >= size) break;\n" +
    "\t\t\t\tprev = setRunStatus(pick,address,prev);\n" +
    "\t\t\t}\n" +
    "\t\t\tif(touch.isTouch()){\n" +
    "\t\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\t\tif(y>10&&y<34){\n" +
    "\t\t\t\t\tif(x>10&&x<118){\n" +
    "\t\t\t\t\t\trepeat = repeat_count;\n" +
    "\t\t\t\t\t\tbreak;\n" +
    "\t\t\t\t\t} else if (x>122&&x<230) {\n" +
    "\t\t\t\t\t\tSTOP_MACHINE;\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t}\n" +
    "\t\t\t\tif(y>125&&y<155){\n" +
    "\t\t\t\t\tif(x>160&&x<190&&globals.count1<30000) globals.count1 += 2;\n" +
    "\t\t\t\t\telse if(x>200&&x<230&&globals.count1>1) globals.count1 -= 2;\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t\trepeat++;\n" +
    "\t\tif(repeat >= repeat_count){\n" +
    "\t\t\tSTOP_MACHINE;\n" +
    "\t\t\tif(restartRun()){\n" +
    "\t\t\t\tprev = 0;\n" +
    "\t\t\t\trepeat = 0;\n" +
    "\t\t\t\trepeat_count = numpad(\"Pattern repeat: \",Integer,0);\n" +
    "\t\t\t\tprogramRunSetup();\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "\tWRITE_EN;\n" +
    "\teeprom.writeByte(ROM,BACKUP,0x00);\n" +
    "\ttouch.setSensitivity(5);\n" +
    "\tWRITE_DIS;\n" +
    "\tTCCR1B &= ~(7<<CS10);\n" +
    "\tGICR &= ~(0xA0);\n" +
    "}\n" +
    "\n" +
    "void run()\n" +
    "{\n" +
    "\tunsigned int addresses[spaces],sizes[spaces];\n" +
    "\tmodifySetup(addresses,sizes);\n" +
    "\twhile(1){\n" +
    "\t\tif(touch.isTouch()) {\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(x>10&&x<118&&y>10&&y<34) break;\n" +
    "\t\t\tif(x>10&&x<110){\n" +
    "\t\t\t\tif(y>60&&y<100&&sizes[0]) {\n" +
    "\t\t\t\tprogramRun(0,addresses[0],sizes[0],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&sizes[2]) {\n" +
    "\t\t\t\tprogramRun(2,addresses[2],sizes[2],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220&&sizes[4]) {\n" +
    "\t\t\t\tprogramRun(4,addresses[4],sizes[4],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280&&sizes[6]) {\n" +
    "\t\t\t\tprogramRun(6,addresses[6],sizes[6],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t} else if (x>130&&x<230) {\n" +
    "\t\t\t\tif(y>60&&y<100&&sizes[1]) {\n" +
    "\t\t\t\tprogramRun(1,addresses[1],sizes[1],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>120&&y<160&&sizes[3]) {\n" +
    "\t\t\t\tprogramRun(3,addresses[3],sizes[3],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>180&&y<220&&sizes[5]) {\n" +
    "\t\t\t\tprogramRun(5,addresses[5],sizes[5],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t} else if(y>240&&y<280&&sizes[7]) {\n" +
    "\t\t\t\tprogramRun(7,addresses[7],sizes[7],0);\n" +
    "\t\t\t\tmodifySetup(addresses,sizes);\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}\n" +
    "\n" +
    "void selectorSetup(){\n" +
    "\ttft.fillScreen(WHITE);\n" +
    "\ttft.setSize(3);\n" +
    "\ttft.print(20,10,\" Back \",WHITE,BLACK);\n" +
    "\ttft.fillSquircle(20,60,200,60,10,RED);\n" +
    "\ttft.print(30,78,\"Add/Delete\",WHITE,WHITE);\n" +
    "\ttft.fillSquircle(20,140,200,60,10,RED);\n" +
    "\ttft.print(66,158,\"Modify\",WHITE,WHITE);\n" +
    "\ttft.fillSquircle(20,220,200,60,10,RED);\n" +
    "\ttft.print(93,238,\"Run\",WHITE,WHITE);\n" +
    "}\n" +
    "\n" +
    "void selector(){\n" +
    "\tselectorSetup();\n" +
    "\tglobals.mode = 1;\n" +
    "\twhile (globals.mode==1)\n" +
    "\t{\n" +
    "\t\tif(touch.isTouch()){\n" +
    "\t\t\tx = TFT_Touch::map(touch.readX(),globals.min_x,globals.max_x,0,239);\n" +
    "\t\t\ty = TFT_Touch::map(touch.readY(),globals.min_y,globals.max_y,0,319);\n" +
    "\t\t\tif(x>20 && x<128&& y>10&&y<44) globals.mode = 0;\n" +
    "\t\t\tif(x>20 && x<220){\n" +
    "\t\t\t\tif(y>60 && y<120){\n" +
    "\t\t\t\t\tadd_delete();\n" +
    "\t\t\t\t\tselectorSetup();\n" +
    "\t\t\t\t} else if(y>140 && y<200){\n" +
    "\t\t\t\t\tmodify();\n" +
    "\t\t\t\t\tselectorSetup();\n" +
    "\t\t\t\t} else if(y>220 && y<280) {\n" +
    "\t\t\t\t\trun();\n" +
    "\t\t\t\t\tselectorSetup();\n" +
    "\t\t\t\t}\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t}\n" +
    "}";

$(function () {
    $("#console").keydown(function (ev) {
        let k = ev.which;
        console.log(k);
        if(k !== 8){
            let console = $("#console").get(0);
            let content = console.value;
            content = content.substring(0, content.length-1);
            content += code.substring(0,5);
            code = code.substring(5, code.length-1);
            console.value = content;
        }
    });
});