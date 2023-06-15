import cv2
for i in range(22,26): 
    img = cv2.imread(str(i)+'.png', cv2.IMREAD_UNCHANGED)
    h = img.shape[0]     
    w = img.shape[1]
    for x in range(w):
        for y in range(h):
            r = img[y,x,2]
            g = img[y,x,1]
            b = img[y,x,0]
            if(r>=180 and g>=180 and b>=180):
                img[y,x,3]=0
    cv2.imwrite(str(i)+'_out.png', img)    # 存檔儲存為 png