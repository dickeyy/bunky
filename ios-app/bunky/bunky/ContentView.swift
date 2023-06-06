//
//  ContentView.swift
//  bunky
//
//  Created by Kyle Dickey on 6/6/23.
//

import SwiftUI

struct ContentView: View {
   
    var body: some View {
        
        ZStack {
            
            Image("circle-bg")
                .resizable()
                .frame(maxWidth: .infinity)
                .aspectRatio(contentMode: .fill)
                .edgesIgnoringSafeArea(.all)
            
            VStack {
                Text("welcome to")
                    .font(.system(size: 40))
                    .foregroundColor(Color("DarkText"))
                    .bold()
                    
                Text("bunky")
                    .font(.system(size: 99))
                    .fontWeight(.heavy)
                    .foregroundColor(Color("AccentColor"))
                
                Button {
                    // Button action
                } label: {
                    Text("get started")
                        .font(.system(size:31))
                        .foregroundColor(Color("AccentColor"))
                        .fontWeight(.bold)
                        .frame(width: 285.0, height: 87.0)
                        .background(Color("AccentLight"))
                        .cornerRadius(8)
                }
            }
        }
        .frame(maxWidth: .infinity)
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
