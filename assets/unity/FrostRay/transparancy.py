from PIL import Image
  
for i in range(1,41):
    img = Image.open(str(i)+'.png')
    rgba = img.convert("RGBA")
    datas = rgba.getdata()
    newData = []
    for item in datas:
        newData.append((item[0],item[1],item[2],255))  # other colours remain unchanged
    rgba.putdata(newData)
    rgba.save("transparent_"+str(i)+"_image.png", "PNG")
