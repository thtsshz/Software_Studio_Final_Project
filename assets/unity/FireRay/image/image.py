import cv2
from PIL import Image
  
for i in range(1,26):
    img = Image.open(str(i)+'.png')
    rgba = img.convert("RGBA")
    datas = rgba.getdata()
    newData = []
    for item in datas:
        newData.append((item[0],item[1],item[2],255))  # other colours remain unchanged
    rgba.putdata(newData)
    rgba.save("transparent_"+str(i)+"_image.png", "PNG")

for i in range(1,41): 
    img = cv2.imread("transparent_"+str(i)+"_image.png", cv2.IMREAD_UNCHANGED)
    h = img.shape[0]     
    w = img.shape[1]
    for x in range(w):
        for y in range(h):
            r = img[y,x,2]
            g = img[y,x,1]
            b = img[y,x,0]
            if(r<=10 and g<=15 and b<=15):
                img[y,x,3]=0
    cv2.imwrite(str(i)+'_out.png', img)    # 存檔儲存為 png